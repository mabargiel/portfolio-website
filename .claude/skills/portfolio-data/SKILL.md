---
name: portfolio-data
description: Fetch content from Sanity, write GROQ queries, define Sanity schemas, or type CMS data for this portfolio site. Use before touching anything in the Sanity or data-fetching layer. Covers the static-export constraints that rule out most published next-sanity patterns.
---

# Portfolio data

Only **projects** and **experience** come from Sanity. Everything else is in
code. Resist moving more into the CMS; each document type is ongoing cost.

## Read this before copying any next-sanity example

The site builds with `output: 'export'`. **There is no runtime server.** Most
`next-sanity` documentation assumes there is, so the headline patterns do not
apply here:

| Pattern in the docs | Here |
|---|---|
| `defineLive`, `sanityFetch`, `SanityLive` | **Unusable.** Requires a running server |
| Draft mode / visual editing / preview routes | **Unusable.** Requires a server |
| Server Actions | **Blocked.** Static export throws at build |
| Route Handlers | Only `GET` with `export const dynamic = 'force-static'` |
| `next/image` default loader | **Blocked.** Needs `images.unoptimized` or a custom loader |
| ISR / `revalidate` | No effect. Content updates only on rebuild |

What to use instead: **plain `client.fetch` in a Server Component, at build
time.** That is the whole data layer. If a proposed approach needs a request to
exist at runtime, it is wrong for this project.

Content goes live only when CI rebuilds, so the **Sanity publish webhook that
triggers the pipeline is load-bearing**, not an optimisation. Without it, edits
never reach the site.

## Client

```ts
// src/sanity/lib/client.ts
import {createClient} from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2026-05-19', // pin it; never leave floating
  useCdn: false,            // build-time fetch wants fresh content, not the CDN
})
```

Pin `apiVersion` to a date and change it deliberately. `useCdn: false` because
every fetch happens once, at build, and stale content would bake into the export.

## Typing: generate, never hand-write

Hand-maintained interfaces for CMS documents drift from the schema silently.
Use Sanity TypeGen.

Wrap **every** query in `defineQuery`. It preserves the query string as a
literal type, which is how TypeGen resolves the result type of `client.fetch`.

```ts
import {defineQuery} from 'next-sanity'

export const projectsQuery = defineQuery(`
  *[_type == "project"] | order(order asc) {
    _id, title, tag, tagVariant, description, outcome, stack,
    image { asset->{url, metadata{lqip, dimensions}}, alt }
  }
`)
```

```sh
sanity schema extract     # -> schema.json
sanity typegen generate   # -> sanity.types.ts
```

Run both in CI before `next build`, so generated types always match the deployed
schema. A query without `defineQuery` silently returns `any`; that is the main
failure mode, and it is invisible until something breaks at runtime.

## GROQ

**Project only the fields you render.** Never fetch the whole document and pick
in JavaScript. The projection is the contract between CMS and component, and a
narrow one makes unused-field removal safe.

Order in the query (`| order(order asc)`), not in the component.

Keep queries in one module per document type, next to the client. Components
receive data as props; they do not fetch.

## Images

The default image loader is blocked by static export. Either set
`images: {unoptimized: true}` or supply a custom loader pointed at Sanity's CDN,
which already handles transforms via `@sanity/image-url`.

Request explicit dimensions and format from Sanity rather than shipping
originals. Pull `metadata.lqip` in the projection for a placeholder, and
`metadata.dimensions` to set `width`/`height` and avoid layout shift.

`alt` is a required field on the image object in the schema, not an
afterthought in the component. Content editors are the only people who can write
it correctly.

## Schema

- Schema files live with the Studio, one file per document type.
- Every field gets a `title` and, where the intent is not obvious, a
  `description`. The editor sees these; they are UI, not documentation.
- Mark genuinely required fields `validation: Rule => Rule.required()`.
  A field the site cannot render without is required.
- `order` is a manual sort number. The projects list is priority-ordered, not
  chronological.
- Date fields on `experience` are **presentational strings**, not dates.
  Engagements overlap and several are open-ended. See `.ai/brief.md`.

## Failure behaviour

A missing or empty result must not break the build silently. If a section would
render empty, fail the build loudly instead of shipping a blank page. A
portfolio that deploys with no projects is worse than one that fails to deploy.
