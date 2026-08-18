## Why

The site is built, verified and merged, and nothing serves it. Twelve gates
prove the export is correct and then discard it. Until a merge puts that
artifact somewhere, every budget in `docs/architecture.md` describes a page
nobody can open.

Deployment was sequenced last on purpose: there was nothing worth putting on a
public URL until there was content. There is content now, so the reason to wait
has gone.

## What Changes

- A Static Web App described in Bicep and committed, rather than clicked into
  existence. One resource, Free tier, and a template that says what it is.
- The pipeline splits into stages. Verification publishes the export as an
  artifact, and deployment consumes that artifact rather than building again.
- Merging to `main` publishes to a named `staging` environment. Pushing an
  annotated semver tag publishes to production.
- The footer reports the version and short commit of the build it came from, so
  confirming a deploy landed does not mean opening a pipeline.
- A `staticwebapp.config.json`, so the export gets a real 404 rather than a
  host default, and the security headers a static site should send.

## Impact

- `azure-pipelines.yml` becomes multi-stage. The existing gates move into the
  first stage unchanged.
- New: `infra/main.bicep`, `staticwebapp.config.json`.
- `SiteFooter` renders a version when one is present, and nothing when it is
  not, so a local build stays honest about being a local build.
- The deployment token is a secret pipeline variable. It is not committed, and
  nothing in the repository can print it.
