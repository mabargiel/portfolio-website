# performance-budgets Specification

## Purpose
TBD - created by archiving change add-ci-gates. Update Purpose after archive.
## Requirements
### Requirement: Budgets are asserted against built output

The budgets in `docs/architecture.md` SHALL be measured against the static export
produced by `build`, served locally by `preview`. They MUST NOT be asserted
against source code, a development server, or a deployed URL.

#### Scenario: The export is measured

- **WHEN** the budget checks run
- **THEN** they load the site from the locally served `out/` directory

#### Scenario: The build produced no output

- **WHEN** `out/` is missing or empty
- **THEN** the budget checks fail rather than reporting a passing score for
  nothing

### Requirement: Lighthouse asserts the mobile performance and accessibility budgets

Lighthouse CI SHALL run a mobile emulation pass against the built output and
assert performance and accessibility against the documented targets, failing the
run on a regression.

#### Scenario: Accessibility regresses

- **WHEN** a change drops the Lighthouse accessibility score below 100
- **THEN** the pipeline fails

#### Scenario: Performance regresses

- **WHEN** a change drops the Lighthouse mobile performance score below the
  documented target
- **THEN** the pipeline fails

### Requirement: No horizontal overflow at any supported width

The built page SHALL be loaded at 320, 375, 414, 768, 1024, 1440 and 1920 pixels
wide, and at each width the document scroll width MUST NOT exceed its client
width.

#### Scenario: An element overflows on a narrow viewport

- **WHEN** the page is loaded at 320 pixels and any content forces the document
  wider than the viewport
- **THEN** the check fails and names the width at which it failed

#### Scenario: All widths fit

- **WHEN** no width produces horizontal overflow
- **THEN** the check passes

### Requirement: Application JS is budgeted separately from framework JS

The bundle check SHALL sum the gzipped size of the scripts the built page
requests, subtract the recorded framework baseline, and assert the remainder
against the application JS budget in `docs/architecture.md`.

#### Scenario: A dependency adds client JavaScript

- **WHEN** a change adds a client-side library that pushes application JS over
  the budget
- **THEN** the pipeline fails and reports the measured size against the budget

#### Scenario: The placeholder page is measured

- **WHEN** the site contains no client-side application code
- **THEN** the measured application JS is near zero and the check passes, rather
  than failing on the framework's own weight

### Requirement: The framework baseline is recorded, not inferred

The framework baseline SHALL be stored with the framework version and the date it
was measured. Changing it MUST be a deliberate edit.

#### Scenario: The framework is upgraded

- **WHEN** a major Next upgrade shifts the baseline
- **THEN** the baseline is re-measured and updated in its own commit, so the
  change is visible in review rather than absorbed into an application change

#### Scenario: An application regression is mistaken for framework growth

- **WHEN** the bundle check fails
- **THEN** the failure reports application JS and the baseline separately, so the
  cause is attributable

