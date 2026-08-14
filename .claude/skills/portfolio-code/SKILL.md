---
name: portfolio-code
description: Write or refactor TypeScript and React for this portfolio site - components, hooks, types, file structure. Use before writing any .ts or .tsx file. Its comment rule applies to every file in the repository, including pipeline YAML, shell scripts, and config, so load it before commenting anywhere. Covers component decomposition, comment discipline, and the React and TypeScript conventions this project holds to.
---

# Portfolio code

The site is a work sample. Someone will open the repo. Code quality is part of
the product, not overhead.

Project shape that drives most decisions: **a static export with a hard JS
budget** (see `docs/architecture.md`). Server Components are the default. Client
JavaScript is a cost you must justify per component, not a starting assumption.

## Comments

**This section applies to every file in the repository**, not only `.ts` and
`.tsx`. Pipeline YAML, GitHub Actions workflows, shell scripts, JSON and config
are all held to it.

The default is **no comment**. Code that needs a comment to be understood is
usually code that needs renaming or splitting. Try that first.

Write a comment only when it records something the code cannot: a non-obvious
external constraint, or a trap that would otherwise be reintroduced.

**Never justify a change.** A comment explaining why a line was added is a commit
message written in the wrong place. It is obvious at the moment of the edit and
noise forever after, because it addresses a reader who was watching the diff, and
nobody is.

```yaml
# The action exchanges an OIDC token for its app token, so it fails without this
id-token: write                        # <- justifies the edit. Delete it.

# Anything shallower and the commit range check has no range
fetchDepth: 0                          # <- records a trap. Keep it.
```

The test: would this comment read as odd in a file written by a person a year
ago, with no diff in view? If the answer is yes, it belongs in the commit
message or in `docs/`, not in the file.

**Never write these:**

```tsx
// Now we map over the projects            <- narrates what the code says
{projects.map(...)}

// Set loading to true                     <- restates the line
setLoading(true)

// This ensures the component re-renders   <- explains React to the reader
useEffect(...)

// I've added a fallback here for safety   <- narrates your own process
const title = data.title ?? 'Untitled'

// Changed from useState to useReducer     <- that is what git log is for
// TODO: you may want to adjust this       <- addressing the reader
// Note: feel free to customize            <- addressing the reader

// ===== HELPERS =====                     <- if the file needs signposts, split it

/**
 * ProjectCard component.                  <- JSDoc that adds nothing
 * @param props - The props
 */
```

The pattern in the middle group is the one to watch hardest: **comments that
narrate the authoring process rather than describe the code.** "I've added",
"Note that I", "Here we", "Let's", "First we". If a comment would read as odd
in code written by a person a year ago, it does not belong.

**Worth writing:**

```tsx
// Sanity returns null for unpublished references, not undefined.
// Azure SWA rewrites unknown paths to index.html, so 404s resolve client-side.
// Fraunces optical sizing breaks below 9pt in Safari; clamp the lower bound.
```

Each records a fact you would otherwise rediscover by debugging.

The same discipline applies to commit messages: describe the change, not the
session that produced it.

## Components

**One component per file.** Filename matches the export. No barrel files that
re-export everything; they defeat tree-shaking and obscure origins.

**Size.** Past roughly 150 lines, look for a split. Past 200, the file is telling
you something. This is a smell threshold, not a lint rule; do not shred a
coherent 180-line component to satisfy a number.

**Split when** a chunk has its own state, is reused, or gets clearer with a name.
**Do not split when** the only gain is a shorter file. A five-line JSX fragment
used once should stay inline. Premature extraction produces a tree of
single-use components that is harder to read than the thing it replaced.

**Props.** Prefer composition over configuration. When a component grows a
third or fourth boolean flag, it wants to be two components or to accept
`children`.

```tsx
// Flag soup
<Card withBorder withImage isCompact isFeatured />

// Composition
<Card>
  <Card.Image src={...} />
  <Card.Body>...</Card.Body>
</Card>
```

Colocate a component with its styles and any component used only by it.

## TypeScript

- `strict: true`. No `any`. No `as` to silence an error; fix the type.
- Avoid the non-null `!`. If a value can be absent, handle it or narrow it.
- **Annotate boundaries, infer internals.** Type the props, the return of an
  exported function, the data coming from Sanity. Do not annotate every local.
- `type` for props and unions. `interface` only when something extends it.
- **No `enum`.** Use a `const` union: `type Variant = 'gold' | 'rust'`.
- `satisfies` for config objects, so you keep inference and still get checking.
- **Discriminated unions over optional-field soup.** If two shapes are
  genuinely different, model them as different.
- **Never hand-write types for CMS content.** Generate them. See `portfolio-data`.

## React

- **Server Components by default.** Add `'use client'` only for actual
  interactivity, and push it to the smallest leaf. A single `'use client'` near
  the root pulls the whole tree into the bundle and blows the JS budget.
- **No `useEffect` for derived state.** If a value can be computed during
  render, compute it during render.
- **No `useState` for what props, the URL, or the DOM already hold.**
- `useMemo` and `useCallback` need a measured reason. Reflexive memoization is
  noise with a runtime cost.
- Stable keys. Never the array index when the list can reorder or filter.
- Handlers named `handleSubmit`; the props that receive them named `onSubmit`.
- Accessibility is in `portfolio-ui` and is not optional.

## Before you finish

1. Reread every comment and delete the ones that restate the code or narrate
   your process.
2. Check the client boundary: is anything `'use client'` that does not need to be?
3. Check that nothing is typed `any` or forced with `as` or `!`.
