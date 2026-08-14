## Why

The budgets in `docs/architecture.md` are written as constraints rather than
targets, and nothing currently checks any of them. Phase 1 produced the scripts
that can do the checking, but they only run when someone remembers to run them.

Timing matters more than it looks. The gates are cheap to add now, when the site
is a placeholder and every one of them passes trivially. They start doing real
work as the site gains weight, which means a regression surfaces in the pull
request that caused it rather than in a batch at the end. Adding them after the
site is built inverts that: the first run reports every violation at once, at the
point where each fix is most expensive, and there is no way to tell which change
introduced which problem.

The same argument applies to the commit and branch conventions. They are
documented in `CLAUDE.md` and enforced locally by git hooks, but hooks are
advisory. Anyone can pass `--no-verify`, and a fresh clone has no hooks until
`npm install` runs.

Deployment is deliberately not part of this. It has different dependencies, needs
an Azure subscription and a Static Web App that do not exist yet, and there is
nothing worth putting on a public URL until the site has real content.

## What Changes

- Azure DevOps project and a pipeline that builds the repository from GitHub over
  a service connection, reporting status back so GitHub can gate merges.
- Every pull request runs the Phase 1 scripts as hard-failing gates: `typecheck`,
  `lint`, `lint:css`, `format:check`, `build`.
- Lighthouse CI runs against the built export served locally by `preview`, and
  asserts mobile performance and accessibility.
- A viewport sweep loads the built page at seven widths and asserts no horizontal
  overflow at any of them.
- A bundle check asserts the application JS budget, measured on top of the
  framework baseline recorded in `docs/architecture.md`.
- Branch names and commit messages are validated in the pipeline by the same
  scripts the git hooks call, so local and CI enforcement cannot drift apart.
- Pull requests get an automated review comment from `anthropics/claude-code-action`
  running in GitHub Actions, pointed at the conventions in `.claude/skills`, with
  no approval rights.

Not in scope, and moved to the phase that owns them: Static Web Apps, staging and
production environments, tagged releases, the footer version, and the Sanity
webhook all belong to the deployment phase. The Sanity environment variable
example file moves to the phase that introduces Sanity, since nothing builds
against it before then.

## Capabilities

### New Capabilities

- `ci-quality-gates`: every pull request is verified by the project's own npm
  scripts before it can merge, with failures blocking rather than warning.
- `performance-budgets`: the numeric budgets in `docs/architecture.md` are
  asserted against the built output, not against source or intent.
- `convention-checks`: branch names and commit messages are validated by the
  same scripts locally and in CI.

### Modified Capabilities

None. `openspec/specs/` is empty; this is the first change to define specs.

## Impact

- New pipeline definition committed to the repository, plus a Lighthouse CI
  configuration and two check scripts (viewport sweep, bundle size).
- New GitHub Actions workflow, the only thing in this project that runs there
  rather than in Azure Pipelines, because pull request comments belong on GitHub.
- Reuses `scripts/check-branch-name.sh` and `scripts/check-commit-message.sh`
  unchanged, which is the point of them being scripts rather than hook bodies.
- No application code changes. `src/` is untouched.
- External setup that has to happen outside the repository: an Azure DevOps
  organisation and private project, an Azure subscription linked to it, a service
  connection to GitHub, and a GitHub token or app for status reporting.
- `docs/architecture.md` gains the measured framework baseline as a recorded
  number if the bundle check needs one committed rather than computed.
