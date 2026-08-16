## 1. Decisions to settle first

These change what gets built, so they come before building. Requires Mateusz.

- [ ] 1.1 Confirm whether there is real imagery for the hero or about sections,
      or whether both must work without images
- [ ] 1.2 Confirm the published contact address
- [ ] 1.3 Confirm the GitHub and LinkedIn URLs
- [ ] 1.4 Decide how closely to follow the reference layout, particularly the
      hero and whether the datasheet aside survives

## 2. Token layer

- [ ] 2.1 Check contrast ratios for every foreground and background pair the
      design will use, before building anything. `text-3` on `base` is the pair
      most likely to fail AA
- [ ] 2.2 Replace the scaffold's tokens in `globals.css` with a `@theme` block
      that clears the default theme and declares the colour tokens
- [ ] 2.3 Add the three fluid type steps as tokens
- [ ] 2.4 Confirm a stock Tailwind class such as `bg-slate-500` produces no style
- [ ] 2.5 Set up the three typefaces through `next/font`, replacing Geist, and
      confirm no request leaves the origin when the built page loads

## 3. Layout and navigation

- [ ] 3.1 Root layout: language, metadata, landmarks, skip link, focus styles
- [ ] 3.2 Navigation with every destination reachable at 320px and no client
      JavaScript
- [ ] 3.3 Confirm `npm run check:viewport` passes at all seven widths
- [ ] 3.4 Confirm the application JS figure is unchanged from the scaffold

## 4. Sections

- [ ] 4.1 Hero
- [ ] 4.2 About, with the datasheet aside if 1.4 keeps it
- [ ] 4.3 Contact, with the `mailto:` link as the single conversion action
- [ ] 4.4 Footer, with the year derived at build time and real social URLs
- [ ] 4.5 Confirm no anchor has `href="#"`

## 5. Copy

- [ ] 5.1 Draft against `portfolio-copy`, then cut every sentence that could
      describe a different contractor
- [ ] 5.2 Read it aloud and cut anything that sounds like a brochure
- [ ] 5.3 Check length against the space the layout gives it

## 6. Remove the scaffold

- [ ] 6.1 Delete the generated page and `public/next.svg`, `vercel.svg`,
      `file.svg`, `globe.svg`, `window.svg`
- [ ] 6.2 Replace the default favicon
- [ ] 6.3 Search the built output for template remnants

## 7. Gates

- [ ] 7.1 Lighthouse accessibility 100 and mobile performance at or above 95
- [ ] 7.2 Every existing gate green
- [ ] 7.3 Compare the rendered page against the reference at 320, 768 and 1440,
      and note anything carried over that was never decided
