## Context

Phase 1 left the repository with five npm scripts that verify the project, a
placeholder page, and two shell scripts that validate branch names and commit
messages. All of them run only when a person or a git hook invokes them, and git
hooks are advisory: `--no-verify` skips them, and a fresh clone has none until
`npm install` runs `prepare`.

The repository lives on GitHub and is public. CI belongs in Azure Pipelines,
which builds from GitHub over a service connection and reports status back as
pull request checks. Nothing is deployed anywhere yet, and this change does not
change that.

Two constraints came out of Phase 1 and shape the work:

- The application JS budget is measured on top of a framework baseline of roughly
  168 kB gzipped, because Next and React ship that much for a page containing a
  single heading. A check written against total JS fails on an empty page.
- `next start` does not exist under `output: 'export'`, so anything that needs to
  load the built site over HTTP has to serve `out/` itself. The `preview` script
  exists for exactly this.

## Goals / Non-Goals

**Goals:**

- A pull request cannot merge while any gate fails.
- Gates run the project's own scripts, so local and CI behaviour cannot diverge.
- The numeric budgets become assertions against built output.
- Branch and commit conventions are enforced somewhere that cannot be bypassed.
- Every gate passes on the current placeholder, so the first red build is a real
  regression rather than a backlog.

**Non-Goals:**

- Any deployment. No Static Web App, no environments, no deployment token, no
  release tagging, no footer version.
- Sanity configuration or environment variables.
- Replacing human review. The automated review comments; it does not approve.

## Decisions

**Gates invoke npm scripts, never reimplement them.** The pipeline runs
`npm run typecheck`, not `tsc --noEmit`. A developer running the script locally
and the pipeline running it must execute identical commands, or the gate becomes
a second source of truth that drifts. This is also why Phase 1 fixed the script
names before CI existed.

**Node comes from `.nvmrc`.** The pipeline reads the file rather than pinning a
version in YAML, so the upgrade to Node 26 in October is one file. Alternative
considered: hardcoding in the pipeline, rejected because two places holding a
version is how they end up disagreeing.

**Lighthouse and the viewport sweep run against `npm run preview`.** Both need
the built site over HTTP, and there is no deployed URL. Serving `out/` on the
agent also keeps the gate independent of hosting, which means it keeps working
unchanged when deployment arrives in a later phase. Alternative considered:
asserting against a deployed preview URL, rejected because it does not exist yet
and would couple a quality gate to infrastructure.

**The bundle check compares application JS against a recorded baseline.** It sums
the gzipped size of the scripts referenced by the built `index.html` and
subtracts the framework baseline. The baseline is a committed number with the
Next version and date beside it, rechecked on a major framework upgrade rather
than silently absorbed. Alternative considered: an absolute ceiling, which is
simpler but conflates a framework upgrade with an application regression and
gives no signal about which occurred.

**Convention checks call the Phase 1 scripts.** `scripts/check-branch-name.sh`
and `scripts/check-commit-message.sh` take their input as arguments precisely so
a pipeline can call them. On a pull request build the branch under test is
`System.PullRequest.SourceBranch`; `Build.SourceBranch` holds `refs/pull/N/merge`
and validating that would pass every time.

**GitHub rulesets are not the enforcement point.** Ruleset metadata restrictions
that could validate branch names and commit messages require a GitHub Enterprise
plan. Branch protection is still used, but only to require the status checks this
pipeline publishes. The validation itself lives in the pipeline.

**The automated review runs in GitHub Actions.** It is the one piece not in Azure
Pipelines, because pull request comments belong where the pull request is. It
authenticates with a subscription token rather than metered API billing, and it
is configured without approval rights.

## Risks / Trade-offs

- **The free parallel job is not granted until an Azure subscription is linked to
  the DevOps organisation.** Expect the first pipeline run to queue forever with
  no useful error. Mitigation: do the linking as an explicit first task, before
  any pipeline exists to debug.
- **Lighthouse scores vary on shared build agents.** A threshold of 95 can fail on
  agent noise rather than a real regression, and a flaky gate gets disabled.
  Mitigation: run several passes and assert on the median, and prefer asserting
  specific metrics over the composite score where possible.
- **Application JS is not cleanly separable from framework JS.** Bundlers put
  application and framework code in shared chunks, so subtracting a baseline is an
  approximation rather than a measurement. Mitigation: treat the number as a
  regression detector with headroom, not an exact accounting, and state that in
  the spec.
- **The baseline goes stale.** A Next upgrade shifts it and the check either fails
  for the wrong reason or is widened until it means nothing. Mitigation: the
  recorded baseline carries the version it was measured against, and updating it
  is a deliberate commit.
- **The review action consumes a subscription allowance.** Mitigation: narrow
  prompt, turn limit, and it stays comment-only so nothing depends on it.
- **Every gate passing trivially today means none of them are proven.** A gate
  that has never failed may be misconfigured. Mitigation: verify each one by
  deliberately breaking it once, and record that as a task rather than assuming.

## Migration Plan

Nothing to migrate. The pipeline is additive and the repository has no history of
CI. Rollback is deleting the pipeline definition, since no application behaviour
depends on it.

Ordering matters in one place: the external Azure setup has to complete before any
pipeline can run, and the subscription link has to complete before the pipeline
can run more than once.

## Open Questions

- What Lighthouse thresholds survive agent variance? The documented targets are
  performance 95 and accessibility 100, and accessibility is deterministic while
  performance is not.
- Is the framework baseline committed as a literal number, or computed in CI by
  building a control page? Computing it is self-maintaining but doubles build time.
- Which GitHub credential reports status back, and does it need to be a GitHub App
  rather than a personal token for a public repository?
- Does the viewport sweep use Playwright, or reuse the Chrome that Lighthouse CI
  already installs on the agent?
