## 1. External setup

Outside the repository, and blocking everything after it. Requires Mateusz.

- [ ] 1.1 Create the Azure DevOps organisation and a private project
- [ ] 1.2 Link an Azure subscription to the organisation, then confirm the
      Microsoft-hosted parallel job is granted by queueing any trivial pipeline
      and watching it start rather than sit in the queue
- [ ] 1.3 Create the service connection from Azure Pipelines to the GitHub
      repository
- [ ] 1.4 Confirm Azure Pipelines can report a status check back to a pull
      request, using a throwaway branch and a pipeline that only echoes

## 2. Pipeline skeleton

- [ ] 2.1 Add the pipeline definition, triggered on pull requests targeting `main`
- [ ] 2.2 Read the Node version from `.nvmrc` rather than pinning it in the
      definition, and print the resolved version in the log
- [ ] 2.3 Install dependencies with `npm ci`
- [ ] 2.4 Verify the pipeline runs on a pull request and its result appears as a
      GitHub check

## 3. Quality gates

- [ ] 3.1 Add gate steps invoking `typecheck`, `lint`, `lint:css`,
      `format:check` and `build` as npm scripts
- [ ] 3.2 Confirm every gate passes on the current placeholder
- [ ] 3.3 Break each gate once on a scratch branch and confirm the pipeline fails
      for that reason, since a gate that has never failed is not proven

## 4. Convention checks

- [ ] 4.1 Add a step running `scripts/check-branch-name.sh` against
      `System.PullRequest.SourceBranch`
- [ ] 4.2 Add a step running `scripts/check-commit-message.sh` over the commits
      the pull request introduces
- [ ] 4.3 Verify with a deliberately malformed branch name and a malformed commit
      subject that each fails, and that a merge commit does not

## 5. Budget checks

- [ ] 5.1 Add a script that serves `out/` and loads the page at 320, 375, 414,
      768, 1024, 1440 and 1920, asserting no horizontal overflow, reporting the
      failing width
- [ ] 5.2 Add Lighthouse CI configuration asserting mobile performance and
      accessibility against the documented targets
- [ ] 5.3 Determine thresholds that survive agent variance, running the pipeline
      several times unchanged to observe the spread before fixing the numbers
- [ ] 5.4 Add a script that sums the gzipped size of the scripts the built page
      requests, subtracts the recorded framework baseline, and asserts the
      remainder against the application JS budget
- [ ] 5.5 Record the framework baseline with its Next version and measurement
      date, in `docs/architecture.md` or a file the check reads
- [ ] 5.6 Confirm the bundle check reports application JS and baseline
      separately on failure
- [ ] 5.7 Wire all three budget checks into the pipeline after `build`

## 6. Automated review

- [ ] 6.1 Add the GitHub Actions workflow running the review action on pull
      requests
- [ ] 6.2 Store the subscription token as a repository secret
- [ ] 6.3 Point the prompt at the conventions in `.claude/skills` and constrain
      the turn count
- [ ] 6.4 Confirm it comments and confirm it holds no approval or blocking rights

## 7. Close out

- [ ] 7.1 Enable branch protection on `main` requiring the pipeline's checks
- [ ] 7.2 Confirm a pull request failing any single gate cannot be merged
- [ ] 7.3 Update `docs/architecture.md` where the CI description differs from
      what was built
