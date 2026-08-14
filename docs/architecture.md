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
| Total JS shipped | < 50 kB gzipped |
| Content edit to live | < 5 min, no developer involvement |

## Stack

| Decision | Choice | Why |
|---|---|---|
| Framework | Next.js (App Router), React, TypeScript | Server Components keep the JS budget reachable |
| CMS | Sanity | Hosted studio, typed GROQ via TypeGen, generous free tier |
| Styling | Token-driven CSS Modules | No utility-class framework to ship or learn |
| Hosting | Azure Static Web Apps | Free tier, custom domain, CI from the repo |
| Rendering | Static export, content fetched at build time | See below |

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
