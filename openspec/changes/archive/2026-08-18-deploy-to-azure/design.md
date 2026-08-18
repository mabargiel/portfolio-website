## Bicep rather than Terraform

Terraform is the tool this project would reach for at any size above one
resource, and it is the one on the CV. It needs a state backend: a storage
account, a container, and locking, all of it provisioned by hand before the
first `apply`, all of it to track a single Free-tier Static Web App. The
backend would be larger than the thing it describes, and it would itself be
unmanaged infrastructure created by clicking.

Bicep is idempotent against the resource group and keeps no state of its own,
so the template is the whole of the infrastructure code. If this grows a
database, a CDN and a key vault, that trade reverses and Terraform earns the
backend.

## A named environment for staging, not a preview environment

Static Web Apps creates an environment per pull request automatically, and that
feature belongs to the GitHub Actions integration. Microsoft's documentation is
explicit that pull request environments are not automatically supported for
Azure DevOps, so staging here is a **named** environment passed through
`deployment_environment` on the deploy task. The Free plan allows three
pre-production environments, so one long-lived `staging` fits.

**Staging is public.** Anyone with the URL can open a pre-production
environment, whether or not the repository is private. Nothing goes to staging
that is not ready to be read by a stranger.

## Build once, within a run

Verification and deployment share one artifact. The gates run against the
export, the export is published, and the deploy stage downloads it. Nothing is
rebuilt between being tested and being shipped.

Across runs this is necessarily weaker. A tag build produces its own artifact,
because the footer version is inlined at build time and a build cannot know a
tag that did not exist when it ran. What ships to production is therefore a
fresh build of the exact commit that passed on `main`, not a copy of the
artifact that passed. The alternative is rewriting strings inside built HTML at
deploy time, which trades a real guarantee for the appearance of one.

## The version is absent, not faked, when it is unknown

`NEXT_PUBLIC_APP_VERSION` is set by tag builds. A local build, a pull request
build and a staging build do not have a version, and the footer renders the
commit alone rather than inventing `v0.0.0`. A version string in a footer is
only useful if it is never wrong.

## The deployment token

`AzureStaticWebApp@0` authenticates with the deployment token, not with the ARM
service connection. The token is a secret pipeline variable set in Azure
DevOps. It is never written to the repository, never echoed by a script, and
rotating it is a portal action that needs no commit.
