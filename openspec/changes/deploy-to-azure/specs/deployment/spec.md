## ADDED Requirements

### Requirement: The verified artifact is what gets deployed

The pipeline SHALL publish the static export as a pipeline artifact in the
stage that verifies it, and every deploy stage SHALL deploy that artifact. A
deploy stage MUST NOT run a build.

#### Scenario: A gate fails

- **WHEN** any gate in the verification stage fails
- **THEN** no deploy stage runs, and nothing is published

#### Scenario: Verification passes on a pull request

- **WHEN** a pull request passes every gate
- **THEN** the artifact is published and no deploy stage runs, because a pull
  request is not a merge

### Requirement: Merging to main publishes to staging

The pipeline SHALL deploy to a Static Web Apps named environment called
`staging` when the verification stage succeeds on `main`.

#### Scenario: A merge lands on main

- **WHEN** a pull request is squashed onto `main` and the gates pass
- **THEN** the artifact is deployed to the `staging` environment and reachable
  at its stable URL

### Requirement: An annotated semver tag publishes to production

The pipeline SHALL deploy to the production environment when the run was
triggered by a tag matching `v<major>.<minor>.<patch>`.

#### Scenario: A release is tagged

- **WHEN** an annotated tag `v1.0.0` is pushed
- **THEN** the gates run against the tagged commit, and on success the artifact
  is deployed to production

#### Scenario: A branch is pushed

- **WHEN** a commit lands on any branch other than `main`
- **THEN** neither deploy stage runs

### Requirement: The footer reports what is deployed

A build triggered by a tag SHALL render the tag and the short commit in the
footer. A build without a tag SHALL render the short commit alone.

#### Scenario: Confirming a production deploy

- **WHEN** a reader opens the production site after a tag deploy
- **THEN** the footer shows the tag and the short commit of that build

#### Scenario: A build with no tag

- **WHEN** the site is built locally or deployed to staging
- **THEN** the footer shows the short commit and no version, rather than a
  placeholder version

### Requirement: The export is served with a 404 and security headers

The deployed site SHALL return the project's own 404 page for unknown paths and
SHALL send `X-Content-Type-Options`, `Referrer-Policy` and a
`Content-Security-Policy`.

#### Scenario: An unknown path is requested

- **WHEN** a visitor opens a path that does not exist
- **THEN** the site responds 404 with its own page, not a host default and not
  the home page with a 200

#### Scenario: The CV is requested

- **WHEN** a visitor opens the CV PDF path
- **THEN** it is served as `application/pdf` and is not rewritten

### Requirement: The deployment credential is not in the repository

The deployment token SHALL be a secret pipeline variable. No file in the
repository may contain it, and no pipeline step may print it.

#### Scenario: The repository is read by a stranger

- **WHEN** anyone reads the public repository
- **THEN** nothing in it authenticates against the Static Web App
