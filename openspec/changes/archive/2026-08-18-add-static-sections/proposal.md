## Why

The site currently serves the page `create-next-app` generated. Every gate built
in the previous phase runs against it, which means all eleven are passing on
content that has nothing to do with this project.

This change replaces it with the parts of the real page whose words belong to
Mateusz: the navigation, the hero, the about section and its datasheet, the
contact section, and the footer. It also establishes the token layer everything
later is built from.

Projects and experience are deliberately excluded. Their copy describes client
work under NDA, the repository is public, and git keeps what it is given even
after a later removal. Those sections are built against generated CMS types in
the next change, so their text never enters the repository at any point.

Doing the token layer now rather than alongside the CMS work matters for the same
reason it mattered to gate the budgets early: every component written afterwards
inherits it. Establishing it after a dozen components exist means retrofitting a
dozen components.

## What Changes

- A Tailwind v4 `@theme` block that **deletes Tailwind's default theme** with
  `--*: initial`, so the stock palette, spacing scale and radii are not reachable
  from a class name and only this project's tokens exist.
- The eleven colour tokens, three font families and three fluid type steps the
  design reference defines, as the whole of the available vocabulary.
- Typefaces resolved and self-hosted, replacing the scaffold's Geist.
- Sections: navigation, hero, about with its datasheet aside, contact, footer.
  Built mobile first, as Server Components.
- **Navigation that works on a phone.** The reference hides every link except
  Contact below 860px, leaving a small-screen visitor no way to move around a
  long page. Replaced rather than carried over.
- The contact section as the single conversion action: a `mailto:` link.
- Real GitHub and LinkedIn URLs in place of the reference's `href="#"`.
- Footer year taken from the build rather than written into the source.
- **Removed:** the generated page, `public/next.svg`, `vercel.svg`, `file.svg`,
  `globe.svg`, `window.svg`, and the default favicon.

Out of scope, and next: the projects and experience sections, Sanity, the image
pipeline, and the Playwright assertions.

## Capabilities

### New Capabilities

- `design-tokens`: the visual vocabulary is closed. Only tokens this project
  defines can be referenced, and going outside them is visible in review.
- `page-shell`: the page presents its sections with correct document semantics
  and navigation that works at every supported width.
- `contact-conversion`: the single action the site exists to produce is present
  and correct.

### Modified Capabilities

None. The three existing specs cover CI behaviour and are untouched.

## Impact

- `src/app/globals.css` gains the theme block and loses the scaffold's tokens.
- `src/app/layout.tsx` and `src/app/page.tsx` are rewritten; new components under
  `src/app` or a sibling components directory.
- `public/` is emptied of template assets. A real favicon is needed.
- No new runtime dependencies expected. Everything here should be a Server
  Component, so the application JS budget should barely move. Small-screen
  navigation is the one part that could require client JavaScript, and the design
  should avoid it.
- Depends on Mateusz for any real imagery. The reference uses `pravatar.cc` and
  `picsum.photos`, and no placeholder may ship.
