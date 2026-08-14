---
name: portfolio-ui
description: Design or build any visual surface of this portfolio site - layout, spacing, type, color, components, responsive behaviour. Use before writing JSX or CSS for anything a visitor sees. Steers toward real portfolio-site conventions and away from generic AI-generated design.
---

# Portfolio UI

The site is a work sample. A visitor who thinks "this looks like every AI-built
landing page" has already discounted the engineer. Looking designed is a
functional requirement, not polish.

## The register: restraint

The audience is professional recruiters, most of them technical, engineering
managers and full-stack engineers who hire as part of the job. They are assessing
whether this person is credible to place on a contract.

That sets the target precisely, and it cuts both ways:

- **Not generic.** Templated and AI-default design reads as low effort.
- **Not showy.** Experimental layout, heavy animation, scroll-jacking, and
  novelty interaction read as a designer's portfolio, not an engineer's. To this
  reader they signal misplaced priorities.

The target is **visible craft with no performance**: considered typography,
disciplined spacing, restrained colour, and everything working. When a choice is
between interesting and clear, choose clear. When between clever and fast,
choose fast.

`.ai/design-reference.html` is a **starting reference, not a spec.**
Layout, sections, and tokens may all change. Use it to understand the intended
level of craft, not as a constraint.

## The tells to avoid

These are what AI-generated design looks like. Avoid them by default; use one only
with a specific reason.

**Layout**
- Everything centered. Centered h1, centered subhead, two centered buttons.
- Three equal-width cards in a row, icon in a circle above each heading.
- `grid-cols-3` symmetry everywhere. Equal columns read as a spreadsheet.
- The stock section rhythm: Hero, Features, Testimonials, CTA, FAQ.

**Surface**
- Purple-to-blue gradient hero, or gradient-filled text.
- `rounded-2xl shadow-lg p-6` applied uniformly to every element.
- Decorative glassmorphism and backdrop-blur with no functional reason.
- Animated gradient blobs behind the hero.
- Indigo `#6366f1` as the accent, the default of a thousand generated sites.

**Type and iconography**
- One neutral sans at default weights, no display face, no personality.
- Emoji as section icons, or a full icon set used decoratively.
- Opacity for text hierarchy (`text-white/60`) instead of real colors.

## What makes a portfolio read as designed

- **Asymmetry.** Uneven column ratios. A content column and a narrower sidebar
  beat two equal halves.
- **Left alignment as the default.** Centering is an exception you spend
  deliberately, usually once.
- **Hairlines over shadows.** A 1px border in a slightly lighter shade of the
  background does what a drop shadow does, without the cheapness.
- **One accent, used rarely.** Scarcity is what makes a color read as an accent.
  If it is on every button, badge, and heading, it is just the palette.
- **A real type system.** A display face with character for headings, a neutral
  face for body, and a monospace for metadata and labels. Three roles, clearly
  separated.
- **Color-based text hierarchy.** Two or three named text colors, not opacity
  ramps. Opacity ramps muddy against any non-flat background.
- **Vertical rhythm and generous section padding.** Whitespace is the cheapest
  luxury signal available and the first thing generated layouts get wrong.
- **Varied module layouts.** When listing projects, alternate image side or vary
  the treatment so the list does not read as a table.
- **Constrained measure.** Body text at roughly 60 to 70 characters per line.
- **A photo normalization treatment.** Portfolio images come from mismatched
  sources. A consistent filter, duotone, or grade makes them cohere. Without it
  the page looks assembled rather than designed.
- **Few breakpoints, executed well.** One or two considered breakpoints beat five
  half-tested ones. See the responsive section below.
- **One distinctive structural device**, applied consistently. A recurring motif
  is what separates a designed page from a competent one. Pick one and commit.

## Responsive

The site must work on phones and desktops equally. A large share of this
audience will first open it on a phone, often from a message or a profile link,
and that first impression is the one that decides whether they keep reading.

**Build mobile-first.** Write the single-column layout as the base and add
complexity upward with `min-width` queries. Retrofitting a desktop layout down
to a phone is where responsive bugs come from, and it tends to produce a mobile
experience that feels like a cut-down version rather than a designed one.

### Testable criteria

"Responsive" is unfalsifiable on its own. These are the checks that count:

- **No horizontal scrolling at any width from 320px up.** The single most common
  failure. Usually a fixed width, a long unbroken string, or a negative margin.
- **Content parity.** Everything reachable on desktop is reachable on mobile.
  Hiding navigation on small screens is not a responsive strategy.
- **Body text at 16px or larger on mobile.** Below 16px, iOS Safari zooms on
  focus, which is jarring and hard to recover from.
- **Tap targets at least 44 by 44 px**, with enough spacing that neighbouring
  targets are not mis-hit.
- **No fixed heights on anything containing text.** Text wraps differently at
  every width and in every language; fixed heights clip it.
- **Images never exceed the viewport** and always reserve their space, so
  nothing reflows as they load.
- **Layout holds at 200% browser zoom**, which is an accessibility requirement
  as much as a responsive one.

### The trap in the reference design

The reference hides every nav link except Contact below 860px:

```css
.nav-links li:not(:last-child){display:none}
```

That leaves a phone visitor with no way to jump to a section on a long page. Do
not carry this across. Either build a real small-screen navigation or drop the
in-page nav entirely and make the page work as a single scroll. Hiding the links
is the one option that is worse than both.

### Breakpoints

Pick breakpoints where **the content** breaks, not at device names. Fewer,
well-chosen breakpoints beat a full device matrix. The reference uses a single
one at 860px, which is defensible but means nothing is tuned between a phone and
a laptop. Decide that deliberately rather than inheriting it.

## Research before designing

Do not design from memory of what portfolio sites look like. Look at current ones.

- Fetch and study real examples before proposing a layout. The best reference
  pool is **engineer and consultant portfolios, small studio sites, and
  well-made product marketing**, because those share this site's job of
  establishing credibility.
- Award galleries (Awwwards, Godly, SiteInspire, Land-book) skew experimental
  and are the wrong register to copy wholesale. Mine them for **craft cues**,
  typographic detail, spacing discipline, restraint, and leave the showpiece
  interactions behind.
- Extract **specifics**: column ratios, section padding in px, type scale, how
  many colors appear, how the projects list is structured. Vague impressions
  produce vague designs.
- Use the **context7 MCP** for framework and library documentation (Next.js,
  Sanity, CSS features). It carries current docs; training memory does not.

When proposing a direction, show the reference and what you took from it.

## Non-negotiable

These hold regardless of design direction, per `docs/architecture.md`:

- Semantic landmarks and heading order. No `<div>` where an element exists.
- Visible focus states on every interactive element.
- AA contrast minimum, verified rather than assumed.
- Real `alt` text on content images; empty `alt` on decorative ones.
- Keyboard-navigable in full.
- Respect `prefers-reduced-motion` for any animation.
- The JS budget in the brief is a hard ceiling. Every dependency is charged
  against it.

## Process

1. Read the relevant part of the current design for intent.
2. Look at real references. Extract specifics.
3. Propose the direction and its reference before building it.
4. Build, then verify contrast, focus, keyboard path, and layout at the
   breakpoints, rather than assuming them.
