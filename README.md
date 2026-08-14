# mateuszbargiel.dev

[![Build](https://dev.azure.com/mbargiel-private/651132b9-46af-42a8-8f00-1f0a544ce145/_apis/build/status/1?branchName=main)](https://dev.azure.com/mbargiel-private/651132b9-46af-42a8-8f00-1f0a544ce145/_build/latest?definitionId=1&branchName=main)
[![Node](https://img.shields.io/badge/node-24_LTS-3c873a)](.nvmrc)
[![Lighthouse performance](https://img.shields.io/badge/lighthouse_performance-%E2%89%A595-brightgreen)](lighthouserc.json)
[![Accessibility](https://img.shields.io/badge/accessibility-100-brightgreen)](lighthouserc.json)
[![Application JS](https://img.shields.io/badge/application_JS-%3C50_kB-brightgreen)](budgets.json)

Personal portfolio site. Single page, statically exported, content for the
projects and experience sections managed in Sanity.

The badges above state thresholds CI enforces, not measurements taken once. A
green build means every one of them currently holds; each links to the file that
defines it.

## Stack

Next.js (App Router), React, TypeScript, Sanity CMS. Built as a static export
(`output: 'export'`) and deployed to Azure Static Web Apps.

## Running it

```sh
npm install
npm run dev
```

Requires a `.env.local`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
```

Content types are typed from the Sanity schema rather than by hand:

```sh
sanity schema extract     # -> schema.json
sanity typegen generate   # -> sanity.types.ts
```

Both run in CI before the build, so generated types always match the deployed
schema.

## Layout

```
docs/architecture.md   decisions and the reasoning behind them
.claude/               project conventions, enforced where possible
  skills/              writing, design, code and data guidance
  hooks/               house-style checks that run on write
```

`docs/architecture.md` is the useful entry point. It covers the static-export
constraint, which rules out a good deal of the usual Next.js and Sanity surface
area and explains most of the structure here.

## Notes

Content only reaches the live site when CI rebuilds, because the export is
static. A Sanity publish webhook triggers the pipeline; without it, edits never
appear.
