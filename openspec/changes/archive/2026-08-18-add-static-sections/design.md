## Context

The repository has a working pipeline and a scaffold page. Eleven gates run on
every pull request, including Lighthouse at accessibility 100 and mobile
performance 95, a viewport sweep at seven widths, and an application JS budget
measured on top of a recorded framework baseline. All of them currently pass
against `create-next-app` output.

The design reference in `.ai/design-reference.html` supplies a palette and a
register. It is not a specification: its CSS was generated without a style bar,
it has a single media query, and `CLAUDE.md` is explicit that no detail should be
preserved merely because it is there.

Its vocabulary is small enough to adopt wholesale:

```
ink #0F1D1A   base #132521   surface #1B322D
line #2C4A42  line-soft #223B35
text #F2EDE3  text-2 #9FB3AC  text-3 #5E736C
gold #DDA13B  rust #C4623F    ok #6FBF9B

Fraunces (display)   Instrument Sans (body)   JetBrains Mono (mono)
clamp(30px,4.5vw,42px)  clamp(42px,6.5vw,72px)  clamp(24px,4vw,38px)
```

A dark, low-chroma green ground with two warm accents. Light mode is out of scope
per the architecture document, so the palette has one mode to serve.

## Goals / Non-Goals

**Goals:**

- A closed token vocabulary: going off-system requires arbitrary-value syntax
  that is conspicuous in a diff.
- Sections that read correctly with real copy, semantics and focus order.
- Navigation usable on a phone.
- Every existing gate still passing, with application JS effectively unchanged.

**Non-Goals:**

- Projects and experience. Their copy is NDA-bound and the repository is public.
- Sanity, the image pipeline, Playwright.
- Light mode, animation systems, anything the reference implies but does not need.

## Decisions

**Delete Tailwind's default theme rather than extend it.** `@theme { --*: initial }`
followed by this project's tokens. `bg-slate-500` and `rounded-lg` stop existing.
The alternative, extending the defaults, leaves the entire stock vocabulary
reachable and makes staying on-system a matter of everyone remembering to. The
architecture document already argues this position.

**Fluid type comes from the tokens, not from breakpoints.** The three `clamp()`
steps go into the theme as custom properties, so type scales continuously and
there is no breakpoint at which headings jump.

**Fonts are self-hosted through `next/font`.** All three families are on Google
Fonts, and `next/font/google` downloads them at build and serves them from the
origin, which is what the architecture document's objection actually targets: the
preconnect hops and the third-party runtime dependency. The cost is that the
build needs network access to fonts.googleapis.com, which is a CI failure mode
worth knowing about. The alternative, committing font files and declaring
`@font-face` by hand, removes that dependency but adds binaries to the repository
and manual subsetting. Revisit if the build ever fails on font fetching.

**Navigation stays visible at every width, with no client JavaScript.** The
reference hides links below 860px, which is the failure this replaces. A
disclosure menu would need state and therefore a client component, which spends
bundle on a page whose entire content is static. A wrapping or horizontally
scrollable strip of anchors keeps every destination reachable at 320px and costs
nothing. If that proves ugly at the narrowest width, dropping the in-page nav
entirely and designing for a single scroll is preferable to hiding links.

**Everything is a Server Component.** There is no interactivity in this change
once navigation is CSS-only. A `'use client'` anywhere here should be treated as
a design failure rather than an implementation detail.

## Risks / Trade-offs

- **A misspelled utility fails silently.** With the defaults cleared, `bg-surfce`
  is not an error, it is a class that does not exist and produces no style. This
  is the direct cost of the closed vocabulary. Mitigation: the viewport sweep and
  Lighthouse catch layout collapse, but not a single wrong colour. Careful review
  of the first components, when the token names are still unfamiliar, is the real
  defence.
- **Accessibility 100 is a hard gate and this change introduces the first real
  content.** Contrast between `text-3` and `base` is the pair most likely to
  fail. Mitigation: check the ratios before building, not after the gate goes red.
- **The build gains a network dependency on Google Fonts.** Mitigation: known and
  recorded here, with the manual `@font-face` route as the fallback.
- **Copy is the hardest part and the easiest to rush.** `portfolio-copy` rejects
  anything that could describe another contractor. This will take longer than the
  markup.

## Migration Plan

Nothing to migrate. The generated page is deleted rather than adapted, and no
part of it is worth keeping. Rollback is reverting the pull request; nothing
external depends on the page.

## Open Questions

- How closely should the reference layout be followed? The intent is to take its
  colours and register and reconsider the structure where `portfolio-ui` argues
  for it. That leaves real latitude in the hero and the datasheet aside, which are
  the two most distinctive pieces.
- Is there real imagery for the hero or about sections, or do those sections need
  to work without images? The reference's placeholders cannot ship, so the layout
  has to be designed for whichever answer holds.
- Does the datasheet aside survive at all? It is the most reference-specific
  element, and a two-column hero with a stat panel is a common enough shape that
  it risks reading as generic.
