## ADDED Requirements

### Requirement: Pull requests are verified before they can merge

The pipeline SHALL run on every pull request targeting `main` and report its
result to GitHub as a status check. A failing gate MUST block the merge rather
than warn.

#### Scenario: A gate fails

- **WHEN** a pull request contains a type error, a lint violation, an unformatted
  file, or code that fails to build
- **THEN** the pipeline fails, the GitHub check reports failure, and the pull
  request cannot be merged

#### Scenario: All gates pass

- **WHEN** a pull request passes every gate
- **THEN** the GitHub check reports success and the pull request is mergeable

#### Scenario: The pipeline never ran

- **WHEN** a pull request has no completed pipeline run
- **THEN** the pull request is not mergeable, so a missing result is treated the
  same as a failure

### Requirement: Gates invoke the project's own npm scripts

Each gate SHALL execute the corresponding npm script rather than reimplementing
the command it wraps. The gates are `typecheck`, `lint`, `lint:css`,
`format:check`, and `build`.

#### Scenario: A script is renamed or removed

- **WHEN** an npm script the pipeline invokes no longer exists
- **THEN** the pipeline fails, rather than skipping the gate silently

#### Scenario: A developer reproduces a CI failure

- **WHEN** a gate fails in CI and the developer runs the same npm script locally
- **THEN** the same command executes and the same failure is reproduced

### Requirement: The Node version comes from a single source

The pipeline SHALL read the Node version from `.nvmrc` rather than declaring it
in the pipeline definition.

#### Scenario: The Node version changes

- **WHEN** `.nvmrc` is updated to a new major version
- **THEN** the pipeline uses that version on the next run with no change to the
  pipeline definition

### Requirement: Pull requests receive an automated review comment

An automated review SHALL run on pull requests and post its findings as comments,
using the conventions in `.claude/skills` as its reference.

#### Scenario: A pull request is opened

- **WHEN** a pull request is opened or updated
- **THEN** the review runs and posts its findings as pull request comments

#### Scenario: The review has an opinion about the change

- **WHEN** the automated review identifies a problem
- **THEN** it comments, and it MUST NOT approve, request changes as a blocking
  state, or otherwise gate the merge
