## ADDED Requirements

### Requirement: The page presents its sections with correct semantics

The page SHALL render navigation, a hero, an about section, a contact section and
a footer, using landmark elements and a single `h1`.

#### Scenario: A screen reader user navigates by landmark

- **WHEN** the page is traversed by landmark
- **THEN** navigation, main content and footer are each reachable as their own
  landmark

#### Scenario: Heading order is checked

- **WHEN** the heading outline is inspected
- **THEN** there is exactly one `h1` and no level is skipped

### Requirement: Every destination is reachable at every supported width

Navigation SHALL keep all of its destinations reachable from 320px upward. Links
MUST NOT be hidden on small screens.

#### Scenario: The page is viewed on a phone

- **WHEN** the page is loaded at 320px
- **THEN** every navigation destination can be reached, rather than all but one
  being hidden

#### Scenario: Navigation costs no client JavaScript

- **WHEN** the built output is measured
- **THEN** navigation has added no client-side JavaScript, because a static page
  should not ship a bundle to open a menu

### Requirement: No template content remains

The scaffold's page and assets SHALL be removed rather than edited around.

#### Scenario: The build output is inspected

- **WHEN** the built site is searched for template remnants
- **THEN** the generated page, its SVG assets and the default favicon are absent

### Requirement: Values that change on their own are derived

Values that change on their own, such as the current year, SHALL be derived at
build time rather than written into the source.

#### Scenario: The year turns over

- **WHEN** a new year begins and the site is rebuilt without source changes
- **THEN** the footer shows the new year

### Requirement: The page is built from Server Components

Sections SHALL be Server Components. A client boundary MUST be justified by
interactivity that cannot be expressed otherwise.

#### Scenario: A section is added

- **WHEN** a section requires no interactivity
- **THEN** it carries no client directive and contributes nothing to the
  application JavaScript budget
