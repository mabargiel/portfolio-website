# Architecture

Decisions and the reasoning behind them. Written to be readable by someone who
did not build this.

## What the site is

A single-page portfolio for a freelance full-stack contractor. One conversion
action: an email. The site is also a work sample, so how it is built is part of
what it argues.

## Budgets

Treated as constraints, not aspirations. A change that breaks one of these is a
change that needs a different approach.

| Criterion | Target |
|---|---|
| Lighthouse performance (mobile) | ≥ 95 |
| Lighthouse accessibility | 100 |
| Largest Contentful Paint | < 1.5s on 4G |
| Application JS shipped | < 50 kB gzipped, on top of the framework baseline |
| Content edit to live | < 5 min, no developer involvement |
| Horizontal overflow | None, at any width from 320px up |
| Cumulative Layout Shift | < 0.1 |

The JS budget counts what this site adds, not what the framework costs. Next and
React ship about 168 kB gzipped for a page containing a single heading, measured
on Next 16 in August 2026. No amount of Server Component discipline reduces that
number, because it is the runtime rather than the application, so a budget
written against the total would fail on an empty page and stay failed.

What the budget does police is every kilobyte after that, which is the part a
review can act on. A carousel, an animation runtime, or a date library trips it
immediately. Recheck the baseline on a major Next upgrade and move it if the
framework moves; do not fold a regression in application code into it.

## Stack

| Decision | Choice | Why |
|---|---|---|
| Framework | Next.js (App Router), React, TypeScript | Server Components keep the JS budget reachable |
| CMS | Sanity | Hosted studio, typed GROQ via TypeGen, generous free tier |
| Styling | Tailwind CSS v4 | CSS-first config, tokens declared in `@theme`, emits CSS rather than JS |
| Hosting | Azure Static Web Apps | Free tier, custom domain, CI from the repo |
| Rendering | Static export, content fetched at build time | See below |

### Styling: a closed vocabulary

Tailwind's default theme is deleted rather than extended:

```css
@theme {
  --*: initial;
  /* only this project's tokens are defined below */
}
```

Everything that makes a Tailwind site identifiable as one, the stock palette, the
default spacing rhythm, the standard radii, stops existing. The only values
reachable from a class name are the ones this design defines.

The reason is the same reason the performance numbers are asserted in CI. A
design system that depends on everyone remembering to use it decays. Going
off-system now requires writing `bg-[#c8a24a]`, which is visible in review, where
a stray hex inside a stylesheet is not.

Hand-written CSS is still used where utilities read worse than the real thing:
pseudo-element decoration, and the blend-mode image grading described below.

### Toolchain pinning

Node 24, the current Active LTS. Pinned in `.nvmrc` and read from there by CI so
the version lives in one place. Node 25 reached end of life on 1 June 2026 and is
not an option.

Two pins in `package.json` look like mistakes and are not.

**TypeScript stays on 6**, not the current 7. `typescript-eslint` refuses to load
under 7, which takes down the entire ESLint run rather than degrading it. The
workaround TypeScript publishes for this, aliasing the package names so tools
needing the old API still resolve it, cannot be used: Next resolves the compiler
by package name and fails the build outright when it is installed under an alias.

Both need the same npm slot, and no override reaches it, because peer dependencies
hoist rather than nest. Next itself builds correctly under TypeScript 7, so the
constraint is ESLint alone. Revisit when `typescript-eslint` ships support.

**ESLint stays on 9.** `eslint-plugin-react`, bundled inside
`eslint-config-next`, calls `context.getFilename()`, which ESLint 10 removed.
Every JSX file throws. Revisit when the plugin catches up.

## The constraint that shapes everything: static export

Azure SWA's hybrid Next.js support is limited, so the site builds with
`output: 'export'`. **There is no runtime server.** The site has no need for one,
so this is a good trade, but it rules out a large part of the Next.js and Sanity
surface area:

| Not available | Consequence |
|---|---|
| Server Actions, intercepting routes | Build fails if used |
| `next/image` default loader | Needs `images.unoptimized` or a Sanity CDN loader |
| ISR, `revalidate` | No effect. Content changes only on rebuild |
| Sanity `defineLive`, draft mode, visual editing | Unusable. All require a server |
| Route Handlers | `GET` only, with `export const dynamic = 'force-static'` |

The data layer is therefore just `client.fetch` inside a Server Component,
evaluated at build.

**This makes the Sanity publish webhook load-bearing.** Content reaches the site
only when CI rebuilds, so a webhook from Sanity to the pipeline is a required
component, not an optimisation. Without it the "content edit to live" budget
above is unmeetable, and edits silently never appear.

## Content model

Only the two sections that change regularly come from the CMS. Everything else
lives in code, because a CMS field nobody edits is pure cost.

### `project`

| Field | Type | Notes |
|---|---|---|
| `title` | string | |
| `tag` | string | eyebrow line, e.g. "Workflow engine · Frontiers · 2025" |
| `tagVariant` | string | `gold` or `rust`, drives the accent colour |
| `description` | text | body paragraph |
| `outcome` | text | pull line |
| `stack` | array&lt;string&gt; | joined for display |
| `image` | image | `alt` required at the schema level |
| `order` | number | manual sort; the list is priority-ordered, not chronological |

### `experience`

| Field | Type | Notes |
|---|---|---|
| `role` | string | |
| `org` | string | |
| `dateLabel` | string | presentational text, not a date |
| `current` | boolean | drives the "now" marker |
| `description` | text | |
| `order` | number | manual sort, newest first |

`dateLabel` is deliberately a string. Engagements overlap and several are
open-ended, so a date range would model the data incorrectly and force
presentational logic into the query layer.

## Scope

**In:** the single page, Sanity-backed projects and experience, responsive
layout, accessibility to AA, an SEO baseline (metadata, Open Graph, sitemap,
robots, JSON-LD `Person`), and CI deployment.

**Out, deliberately:** contact form (a `mailto:` link needs no backend and has no
spam surface), case-study detail pages, blog, analytics, internationalisation,
light mode.

## Delivery

Repository on **GitHub**, CI/CD in **Azure Pipelines**, hosting on **Azure
Static Web Apps**. Azure Pipelines builds from GitHub over a service connection
and reports status back as PR checks.

The split is deliberate. GitHub is where the code is discoverable and where PR
review tooling lives; Azure is where the delivery story belongs, since the site
argues for Azure and DevOps competence. Wiring the two together is itself part of
what the repo demonstrates.

### CI, on every pull request

All gates hard-fail. A red check blocks the merge.

| Gate | Enforces |
|---|---|
| `tsc --noEmit` | No type errors, no implicit `any` |
| ESLint | Code correctness and house rules |
| Stylelint | CSS conventions |
| Prettier `--check` | No formatting-only diffs in review |
| `next build` | The static export actually produces output |
| Lighthouse CI | The budgets below, asserted |
| Bundle size | Application JS, measured on top of the framework baseline |
| Viewport sweep | No horizontal overflow from 320px to 1920px |

**The performance budgets are enforced, not aspirational.** Lighthouse CI asserts
performance ≥ 95 and accessibility 100 against the built output, and a bundle
check asserts the application JS budget. Both fail the run on regression. Numbers
in a document that nothing checks decay within weeks. Since the site is itself a
work sample, a regression is a defect.

The same applies to responsive behaviour. The site has to work on phones and
desktops, so a scripted sweep loads the built page at a range of widths (320,
375, 414, 768, 1024, 1440, 1920) and asserts `scrollWidth <= clientWidth` at
each. Horizontal overflow is the most common responsive defect and the easiest
to catch mechanically. Lighthouse's mobile run already covers the viewport meta
tag, tap target sizing, and legible font sizes, so the sweep only needs to cover
what Lighthouse does not.

### AI review on pull requests

`anthropics/claude-code-action` runs on PRs and posts inline review comments.
This is the one piece that lives in GitHub Actions rather than Azure Pipelines,
because PRs are on GitHub and that is where review comments belong.

It authenticates with `CLAUDE_CODE_OAUTH_TOKEN`, generated locally by
`claude setup-token`, which runs the action against an existing Claude
subscription rather than metered API billing. Cost control comes from
`--max-turns` and a narrow prompt.

The value over a generic review bot is that it can be pointed at this project's
actual conventions, the rules in `.claude/skills/`, rather than generic advice.

**It is an additional gate, never a substitute for human review, and it must not
be given approval rights.** Automated review that can approve its own findings
would contradict the standard this project holds to.

### CD: staging on merge, production on tag

Merging to `main` deploys to a **staging** environment. Pushing an annotated
semver tag (`v1.4.0`) promotes to **production**. Merging proves the code is
good; tagging says it ships. That separation keeps the deployed version an
explicit decision and makes the tag the single source of truth for what is live.

The pipeline builds once and deploys that artifact. It never rebuilds between
verification and deployment, so what was tested is what ships.

Staging uses a Static Web Apps **named environment**, set through the
`deployment_environment` input on the `AzureStaticWebApp@0` task, which publishes
to a stable URL:

```
https://<default-host-name>-staging.<region>.azurestaticapps.net
```

Named environments are the mechanism here because the automatic per-pull-request
preview environments are a GitHub Actions feature. Microsoft's documentation is
explicit that pull request environments are not automatically supported for
Azure DevOps. The Free plan allows three pre-production environments alongside
production, so a single long-lived `staging` fits comfortably.

**Staging is not private.** Per Microsoft: anyone with the URL can reach a
pre-production environment, even when the repository is private. Treat anything
deployed there as published.

### Version on the footer

The tag name is injected at build time and rendered in the footer, alongside the
short commit SHA:

```
v1.4.0 · a1b2c3d
```

Azure Pipelines exposes the tag as `Build.SourceBranchName` on a tag-triggered
run. That value is passed into the build as `NEXT_PUBLIC_APP_VERSION`, which
Next.js inlines at build time. Under static export this is exactly right: the
version is fixed per build, which is what a deployed artifact should report.

The footer version is also the fastest way to confirm a deploy actually landed,
without checking a pipeline.

### Sanity webhook

A publish webhook from Sanity triggers the pipeline so content edits reach the
site. Content-only rebuilds deploy from the current release tag; they do not
create a new version.

## Cost

Everything in this stack runs on a free tier. The two things worth knowing:

| Service | Free tier | Catch |
|---|---|---|
| GitHub | Unlimited public and private repos | None |
| GitHub Actions | Unlimited minutes on public repos; 2,000 min/month on private | Only used for the review bot |
| Claude review bot | Runs on an existing Claude subscription via `CLAUDE_CODE_OAUTH_TOKEN` | Consumes that plan's allowance. An `ANTHROPIC_API_KEY` instead would be metered per token |
| Azure Pipelines | 1 parallel job, 1,800 min/month, 60 min per job | **Must link an Azure subscription** to enable the Microsoft-hosted free grant. It is not on by default |
| Azure Static Web Apps | 100 GB bandwidth per subscription, 2 custom domains, free SSL | No SLA. Exceeding quota takes the site offline rather than billing overage |
| Sanity | Free project tier | None at this scale |
| Lighthouse CI | Open source, runs on the build agent | None |

Azure DevOps **public projects are retired**; new ones cannot be created and
existing ones convert to private in 2027. The project is private, which is why
the 1,800 minute grant is the relevant number. For a site that builds on tag and
on content publish, that is a large allowance.

## Images

Portfolio images arrive from mismatched sources. A consistent grading treatment,
currently a duotone, is what lets new images drop in without re-art-directing the
page. Request explicit dimensions and format from the Sanity CDN rather than
shipping originals, and pull `metadata.lqip` for placeholders and
`metadata.dimensions` to prevent layout shift.

## Typefaces

Self-hosted rather than loaded from Google Fonts. That removes two `preconnect`
hops, a render-blocking request, and a third-party runtime dependency, all of
which are charged against the budgets above.
