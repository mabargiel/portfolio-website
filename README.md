# mateuszbargiel.dev

[![Build](https://dev.azure.com/mbargiel-private/651132b9-46af-42a8-8f00-1f0a544ce145/_apis/build/status/1?branchName=main)](https://dev.azure.com/mbargiel-private/651132b9-46af-42a8-8f00-1f0a544ce145/_build/latest?definitionId=1&branchName=main)
[![Node](https://img.shields.io/badge/node-24_LTS-3c873a)](.nvmrc)
[![Lighthouse performance](https://img.shields.io/badge/lighthouse_performance-%E2%89%A595-brightgreen)](lighthouserc.json)
[![Accessibility](https://img.shields.io/badge/accessibility-100-brightgreen)](lighthouserc.json)
[![Application JS](https://img.shields.io/badge/application_JS-%3C50_kB-brightgreen)](budgets.json)

Single-page portfolio for a freelance full-stack contractor.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · Sanity for the
projects and experience sections. Static export, hosted on Azure Static Web Apps.

## Running it

```sh
npm install
npm run dev
```

```sh
npm run build        # static export to out/
npm run preview      # serve out/ on :4173
npm run typecheck
npm run lint
npm run lint:css
npm run format
```

## CI

Azure Pipelines runs the scripts above on every pull request, plus Lighthouse, a
viewport sweep at seven widths, and a check on how much JavaScript the page
ships. Any of them failing blocks the merge.

There is no server. Content reaches the site only when CI rebuilds, so a Sanity
publish webhook is load-bearing rather than a convenience.

`docs/architecture.md` has the decisions and the reasoning behind them.
