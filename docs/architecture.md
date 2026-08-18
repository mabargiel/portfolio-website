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

| Criterion | Target | Gated in CI |
|---|---|---|
| Lighthouse performance (mobile) | ≥ 95 | warned, see below |
| Lighthouse accessibility | 100 | yes |
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

`localeString` and `localeText` are objects with a required `en` and an optional
`pl`. Everything a visitor reads is one of the two; everything else is a plain
field, because translating a technology name or a date range produces churn
without meaning.

### `project`

| Field | Type | Notes |
|---|---|---|
| `title` | localeString | |
| `kind` | localeString | first part of the eyebrow, e.g. "Workflow engine" |
| `client` | string | omitted where the client cannot be named |
| `period` | localeString | e.g. "2025-now"; localized because "now" is a word |
| `current` | boolean | gold eyebrow while running, rust once finished |
| `description` | localeText | body paragraph |
| `outcome` | localeText | pull line |
| `stack` | array&lt;string&gt; | joined for display |
| `links` | array&lt;{label,url}&gt; | public URLs only |
| `diagram` | string | selects a diagram drawn in code |
| `images` | array&lt;image&gt; | up to two; `alt` required at the schema level |
| `order` | number | manual sort; the list is priority-ordered, not chronological |

A project shows either a diagram or its images, never both. The three diagrams
are drawn in code rather than uploaded, because they are line art that has to
match the palette and stay legible at any width.

### `experience`

| Field | Type | Notes |
|---|---|---|
| `role` | localeString | |
| `org` | string | |
| `dateLabel` | localeString | presentational text, not a date |
| `current` | boolean | drives the "now" marker |
| `description` | localeText | |
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
| Branch name | Conventional Branch |
| Commit messages | Conventional Commits, over the range the pull request adds |
| Pull request title | The subject a squash merge will write to `main` |

The convention gates call the same scripts the git hooks call, so there is one
definition rather than two that drift. The pull request title is the exception
and runs in GitHub Actions: a squash merge writes the title to `main` as the
commit subject, and Azure Pipelines exposes the pull request number but not its
title. GitHub appends ` (#N)` to that subject, so the length check has to
measure the title plus the suffix rather than the title alone.

**The performance budgets are enforced, not aspirational**, but not all of them
can be enforced on a shared build agent. Numbers in a document that nothing
checks decay within weeks, so what CI asserts has to be something CI can measure
twice and get the same answer.

Lighthouse's composite performance score is not that. Three runs of one commit
on a two-core agent returned 0.85, 0.95 and 0.92, where the same commit scores
0.96 on a developer machine. The score is a weighted blend of timings, and the
mobile run multiplies an already-slow CPU by four. A gate on the blend fails at
random, and a gate that fails at random is one people learn to skip.

So CI hard-fails on the parts that hold still: accessibility at 100, which is
audits rather than timings, Total Blocking Time under 300ms against a measured
17 to 35ms, and Cumulative Layout Shift under 0.1 against a measured zero. Those
catch what actually regresses. Ship an animation runtime and Total Blocking Time
moves; ship an image without dimensions and Cumulative Layout Shift moves. The
application JS budget is asserted separately and exactly, by reading the script
tags out of the export.

The composite score stays as a warning, and ≥ 95 remains the number to hold. It
is verified on a quiet machine before a release rather than on every push.

The same applies to responsive behaviour. The site has to work on phones and
desktops, so a scripted sweep loads the built page at a range of widths (320,
375, 414, 768, 1024, 1440, 1920) and asserts `scrollWidth <= clientWidth` at
each. Horizontal overflow is the most common responsive defect and the easiest
to catch mechanically. Lighthouse's mobile run already covers the viewport meta
tag, tap target sizing, and legible font sizes, so the sweep only needs to cover
what Lighthouse does not.

### Testing

No unit tests. Components take typed data and render it, and TypeGen with
`defineQuery` turns a mismatch between what a query returns and what a component
expects into a compile error. A test asserting that a component renders the
string it was handed restates the type system.

End to end tests run in Playwright against the built export served by `preview`,
alongside the viewport sweep that already uses both.

They exist for one failure mode nothing else can see. Content is fetched at build
time, so a wrong dataset, an unpublished document or a renamed field produces a
green build and a blank page. Lighthouse scores an empty page perfectly, the
bundle is small, nothing overflows, and the site ships with no portfolio in it.

| Assertion | Why |
|---|---|
| The email link is present and its `mailto:` is correct | The single conversion action. Broken, the site fails at its only job |
| Projects and roles render, above a minimum count | Catches a build that succeeded against no content |
| Every image has non-empty `alt` and returns 200 | `alt` is required at the schema level, so an empty one means the content is wrong |
| No `href="#"` anywhere | The reference design ships placeholder social links, and placeholders survive |
| No console errors on load | Cheap, and catches asset and hydration problems |

Assertions are on semantics: roles, `alt`, `href`, visible text. Never on class
names or utilities. A suite that breaks whenever the design moves is a suite
people delete.

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

### The resource is described, not clicked

`infra/main.bicep` describes the Static Web App: one resource, Free tier, in
West Europe. Standing it up from nothing:

```
az account set --subscription <the one that should be billed>
az group create --name portfolio-rg --location westeurope
az deployment group create --resource-group portfolio-rg --template-file infra/main.bicep
```

The first line is not optional and is the reason this list exists. `az` carries
a default subscription, and an account that is a guest in someone else's
directory will happily create billable resources there without saying so. Check
whose tenant is active before creating anything:

```
az account show --query "{subscription:name, user:user.name, tenant:tenantId}"
```

Bicep rather than Terraform, for now. Terraform needs a state backend, and a
storage account with locking to track a single Free-tier resource is larger
than the thing it tracks, and is itself infrastructure created by hand. If this
grows a database or a CDN, that trade reverses.

### What the host is told

`public/staticwebapp.config.json` travels with the export. It sets a real 404
through `responseOverrides` rather than a navigation fallback, which would
answer unknown paths with 200 and the home page.

Its `Content-Security-Policy` allows `'unsafe-inline'` for scripts and styles,
which is not a preference. Next inlines the flight payload in six script tags,
and the portrait carries a `style` attribute for its mask. A static export has
no server to mint a nonce per response, so the honest options are inline-allowed
or hashes regenerated on every build. Tightening this means moving off the
static export, not editing the header.

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

It is, however, not indexed. Static Web Apps sends `x-robots-tag: none` on
pre-production environments automatically. Lighthouse reads that as the page
being blocked from indexing and scores SEO around 0.69 there, against 1.00 on
the same commit locally. That number is the environment behaving correctly, not
a defect, and it is the reason to run the SEO check against production rather
than against staging.

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

### The studio is hosted, the site is not rebuilt by it

`sanity deploy` publishes the studio to `mbargiel-portfolio.sanity.studio`,
recorded as `studioHost` in `src/cms/sanity.cli.ts` so the name is in the
repository rather than in one person's shell history. Editing content needs a
browser and a Sanity login, not a checkout.

Publishing there changes nothing on the site by itself. The site is a static
export built once and served as files, so an edit reaches a visitor only when
something rebuilds it. That is what the webhook below is for, and without it a
hosted studio is a convincing way to believe you have published something you
have not.

### Sanity webhook

A publish webhook from Sanity triggers the pipeline so content edits reach the
site. Content-only rebuilds deploy from the current release tag; they do not
create a new version.

## Findability

The site is one page, so search work is mostly about how it appears elsewhere.

`SITE_URL` in `src/site.ts` is the single place the domain is written. Open
Graph consumers, WhatsApp and LinkedIn among them, will not resolve a relative
image, so every social URL is built absolute from it.

The social card is a route rendered at 1200x630 and screenshotted alongside the
CV, for the same reason the CV is a page: it stays in step with the design
instead of being a file someone remembers to re-export.

`robots.txt` hides `/cv/en/`, `/cv/pl/` and `/og/`, which are the templates the
PDFs and the card are rendered from. It deliberately does not hide `/cv/`,
which would take the PDFs with it.

A `Person` block in JSON-LD carries the name, role, location and profile links.
It is the shape Google and the assistants built on it read first, and none of
it is inferable from prose.

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

Images are plain `<img>` with a Sanity CDN `srcset`, not `next/image`. Under
`output: 'export'` the image component cannot optimize anything, so it would add
markup and a component boundary in exchange for nothing the CDN is not already
doing.

## Typefaces

Self-hosted rather than loaded from Google Fonts. That removes two `preconnect`
hops, a render-blocking request, and a third-party runtime dependency, all of
which are charged against the budgets above.

Two families are loaded, Fraunces for display and Instrument Sans for body, both
with the `latin-ext` subset because Polish needs it. Monospace is a system
stack. A third webfont put mobile Lighthouse at 0.91 to 0.93 against a target of
0.95: a text element that first paints in a fallback and later swaps registers
its LCP at the swap, so every kilobyte of font ahead of the display face pushes
the headline back. The mono is small metadata, so it was the one to give up.

For the same reason nothing above the fold animates from `opacity: 0`. Chrome
never counts an element that first paints transparent as an LCP candidate, so a
fade-in hero measures as though the headline were never painted at all.

### The build discards Next's fetch cache

`npm run build` removes `.next/cache` before it runs. Content arrives through
`fetch`, and Next persists fetch responses across builds, so a warm cache
rebuilds the site from the previous publish. Every gate passes and the export
looks correct; it is simply the old content.

That matters because a content edit is supposed to reach the site through the
Sanity webhook and nothing else. Caching the build directory to save a minute
would break exactly that path, and break it quietly.

## The CV

The site is English only. The CV is the bilingual artefact, downloadable from
the nav as a PDF per language.

It is a page, not a document format. `/cv/en` and `/cv/pl` render from the same
Sanity content the site uses, and `scripts/build-cv.mjs` prints them with
Playwright after `next build`. Content stays in one place, and the CV cannot
drift from the site the way a hand-maintained PDF does.

### Written to be parsed

Applicant tracking systems and the language models now doing first-pass
screening both read the extracted text layer, not the layout. That constrains
the design more than taste does:

- **One column.** Extraction follows document order. Two columns interleave.
- **Conventional headings.** Summary, Experience, Skills, Education. Parsers key
  off the words.
- **Dates as ranges with a dash.** The site writes "2023 → now"; an arrow reads
  as part of the month, so the CV rewrites it.
- **Contact details as text**, including the full github.com and linkedin.com
  paths, because extraction takes visible text and not `href`.
- **No layout tables, no meaning carried by an icon**, and no text baked into an
  image.

Verify a change by extracting the text, not by looking at the PDF.

What the CV deliberately does not do is hide keywords in white-on-white text or
stuff a block of skills off the page. Screening tools flag both, and it would
misrepresent the person the document is for.

### Whole font files

The CV loads its fonts with `next/font/local` rather than `next/font/google`.
Google's CSS splits a family into one file per unicode range. A Polish word
mixes glyphs from the latin and latin-ext files, Chrome writes a separate text
run for each, and every extractor reads the gap between them as a space:
`Niezale z ny freelancer`. Sixty-three words in the Polish CV broke that way
before the switch, and the document exists to be searched.

The site keeps `next/font/google`, where the split costs nothing.

## Localization## Localization

Only the CV has two languages. `next-intl` covers its labels and its two routes,
used exclusively from Server Components, which is why the application JS figure
did not move when it was added.

Polish falls back to English field by field rather than document by document, so
a half-translated CV renders as Polish where it can and English where it cannot,
instead of switching wholesale.

The site itself was briefly bilingual and is not any more. English is the
language its readers hire in, and a second copy of every sentence is a second
copy to keep true.
