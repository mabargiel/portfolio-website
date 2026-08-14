## 1. External setup

Outside the repository, and blocking everything after it. Requires Mateusz.

- [x] 1.1 Create the Azure DevOps organisation and a private project
- [x] 1.2 Create the service connection from Azure Pipelines to the GitHub
      repository
- [x] 1.3 Enable the Microsoft-hosted free parallel job by linking an Azure
      subscription under Organization settings, Billing. Confirmed by a job
      starting rather than queueing
- [x] 1.4 Prove Azure Pipelines can publish a check onto a GitHub pull request,
      using a throwaway branch and a pipeline that only echoes. This is the
      prerequisite for requiring the check in the ruleset, which cannot select a
      check GitHub has never received
- [x] 1.5 Set the squash merge commit message to the pull request title and
      description in repository settings, so the subject landing on `main` is
      the title rather than a generated one
- [x] 1.6 Finish the `main` ruleset: require a pull request, require the
      pipeline's check, and leave the bypass list empty. The `update` rule had
      to be removed: it contradicts the pull request rule, since a merge is
      itself an update, so with an empty bypass list nothing could ever merge
- [x] 1.7 Merge the smoke test pull request, which exercises the squash message
      setting, the pull request requirement and the required check in one go.
      Keep the Azure pipeline definition and the `azure-pipelines.yml` path,
      since the ruleset names the definition rather than the file contents
- [x] 1.8 Confirm a direct push to `main` is rejected

## 2. Pipeline skeleton

- [x] 2.1 Add the pipeline definition, triggered on pull requests targeting `main`
- [x] 2.2 Read the Node version from `.nvmrc` rather than pinning it in the
      definition, and print the resolved version in the log
- [x] 2.3 Install dependencies with `npm ci`
- [ ] 2.4 Verify the pipeline runs on a pull request and its result appears as a
      GitHub check

## 3. Quality gates

- [x] 3.1 Add gate steps invoking `typecheck`, `lint`, `lint:css`,
      `format:check` and `build` as npm scripts
- [ ] 3.2 Confirm every gate passes on the current placeholder
- [ ] 3.3 Break each gate once on a scratch branch and confirm the pipeline fails
      for that reason, since a gate that has never failed is not proven

## 4. Convention checks

- [x] 4.1 Add a step running `scripts/check-branch-name.sh` against
      `System.PullRequest.SourceBranch`
- [x] 4.2 Add a step running `scripts/check-commit-message.sh` over the commits
      the pull request introduces
- [x] 4.3 Validate the pull request title, allowing for the ` (#N)` suffix
      GitHub appends when squashing, so the title check and the subject that
      lands on `main` cannot disagree about length
- [ ] 4.4 Verify with a deliberately malformed branch name and a malformed commit
      subject that each fails, and that a merge commit does not

## 5. Budget checks

- [x] 5.1 Add a script that serves `out/` and loads the page at 320, 375, 414,
      768, 1024, 1440 and 1920, asserting no horizontal overflow, reporting the
      failing width
- [x] 5.2 Add Lighthouse CI configuration asserting mobile performance and
      accessibility against the documented targets
- [ ] 5.3 Determine thresholds that survive agent variance, running the pipeline
      several times unchanged to observe the spread before fixing the numbers
- [x] 5.4 Add a script that sums the gzipped size of the scripts the built page
      requests, subtracts the recorded framework baseline, and asserts the
      remainder against the application JS budget
- [x] 5.5 Record the framework baseline with its Next version and measurement
      date, in `docs/architecture.md` or a file the check reads
- [x] 5.6 Confirm the bundle check reports application JS and baseline
      separately on failure
- [x] 5.7 Wire all three budget checks into the pipeline after `build`

## 6. Automated review

- [x] 6.1 Add the GitHub Actions workflow running the review action on pull
      requests
- [ ] 6.2 Store the subscription token as a repository secret
- [x] 6.3 Point the prompt at the conventions in `.claude/skills` and constrain
      the turn count
- [ ] 6.4 Confirm it comments and confirm it holds no approval or blocking rights

## 7. Close out

- [x] 7.1 Enable branch protection on `main` requiring the pipeline's checks
- [ ] 7.2 Confirm a pull request failing any single gate cannot be merged
- [x] 7.3 Update `docs/architecture.md` where the CI description differs from
      what was built
