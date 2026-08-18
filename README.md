# mbargiel.dev

[![Build](https://dev.azure.com/mbargiel-private/651132b9-46af-42a8-8f00-1f0a544ce145/_apis/build/status/1?branchName=main)](https://dev.azure.com/mbargiel-private/651132b9-46af-42a8-8f00-1f0a544ce145/_build/latest?definitionId=1&branchName=main)
[![Node](https://img.shields.io/badge/node-24_LTS-3c873a)](.nvmrc)
[![Accessibility](https://img.shields.io/badge/accessibility-100-brightgreen)](lighthouserc.json)
[![Application JS](https://img.shields.io/badge/application_JS-%3C50_kB-brightgreen)](budgets.json)

Single-page portfolio for a freelance full-stack contractor, at
[mbargiel.dev](https://mbargiel.dev).

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · Sanity for the
projects and experience sections. Static export, hosted on Azure Static Web Apps.

Every component is a Server Component. The page ships no application JavaScript
of its own, which the bundle check asserts against the framework baseline rather
than against zero.

## Running it

```sh
npm install
npm run dev          # http://localhost:3000
```

```sh
npm run build        # static export to out/, then the CV PDFs and social card
npm run preview      # serve out/ on :4173
npm run assets       # regenerate the PDFs and card from a built out/
npm run cms:types    # regenerate GROQ types from the Sanity schema
```

Content lives in Sanity and the build fetches it, so `SANITY_PROJECT_ID` and
`SANITY_DATASET` have to be set. Copy `.env.local.example` to `.env.local`.

## The CV

`/cv/en` and `/cv/pl` are pages, printed to PDF by Playwright after the export
and offered from the nav. They render from the same Sanity content as the site,
so the CV cannot drift from it.

Their layout answers to what reads them. Screening tools consume a PDF's text
layer rather than its layout, so the CV is one column in document order and
loads whole font files rather than per-unicode-range ones. Verify a change by
extracting the text, not by looking at the page.

## The studio

`src/cms` is a standalone Sanity studio with its own lockfile, deployed
separately to `mbargiel-portfolio.sanity.studio`. The site's install never pulls
it in, so an accidental import fails to resolve rather than shipping a studio to
the browser.

## Checks

```sh
npm run typecheck
npm run lint
npm run lint:css
npm run format:check
npm run check:bundle      # application JS against the framework baseline
npm run check:viewport    # no horizontal overflow, 320px to 1920px
npm run check:lighthouse
```

Azure Pipelines runs all of them on every pull request and blocks the merge on
failure. Lighthouse hard-fails on accessibility, blocking time and layout shift;
the composite performance score is a warning, because a shared agent cannot
measure it twice and get the same answer. `docs/architecture.md` explains why.

## Deploying

Merging to `main` publishes to a staging environment. An annotated semver tag
publishes to production, and the footer reports the tag and commit it was built
from. `infra/main.bicep` describes the Static Web App.
