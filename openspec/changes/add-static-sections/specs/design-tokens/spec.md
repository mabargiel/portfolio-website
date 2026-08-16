## ADDED Requirements

### Requirement: The token vocabulary is closed

The theme SHALL delete Tailwind's default theme before declaring this project's
tokens, so that no default palette, spacing or radius value is reachable from a
utility class.

#### Scenario: A default Tailwind colour is used

- **WHEN** a component uses a class from Tailwind's stock palette, such as
  `bg-slate-500`
- **THEN** no style is produced, because the token does not exist

#### Scenario: A project token is used

- **WHEN** a component uses a class built from a declared token, such as
  `text-ink`
- **THEN** it resolves to the value declared in the theme

### Requirement: Going off-system is visible in review

A value not present in the token set SHALL require arbitrary-value syntax rather
than being silently available.

#### Scenario: A raw colour is introduced

- **WHEN** a component needs a colour that is not a token
- **THEN** it must be written as an arbitrary value, such as `bg-[#c8a24a]`,
  which is conspicuous in a diff

### Requirement: Type scales continuously

Fluid type steps SHALL be declared as tokens using `clamp()`, so heading sizes
scale with the viewport rather than stepping at breakpoints.

#### Scenario: The viewport is resized between breakpoints

- **WHEN** the viewport width changes between two named breakpoints
- **THEN** heading sizes change continuously rather than jumping

### Requirement: Typefaces are served from this origin

Fonts SHALL be served from the site's own origin, with no request to a
third-party font host at runtime and no `preconnect` to one.

#### Scenario: The page loads

- **WHEN** a visitor loads the page
- **THEN** every font request goes to this origin
