## Why

The site is deployed and the studio is not. Content lives in Sanity, a build
reads it, and the only way to run that build is a developer with a checkout, a
merge, and a tag.

`docs/architecture.md` claims a content edit reaches the site in under five
minutes with no developer involvement. Nothing in the repository makes that
true. It is the last budget still describing an intention rather than a
behaviour.

## What Changes

- `sanity deploy` publishes the studio to `mbargiel-portfolio.sanity.studio`,
  so editing needs a browser and a login rather than a clone.
- A publish webhook triggers the pipeline, so an edit rebuilds the site.

## The part that needs deciding

A webhook fires against a branch, and a branch build deploys to staging. The
architecture document says content rebuilds should ship from the current
release tag without creating a new version. Those two statements do not agree,
and the gap is the whole design question in this change:

- Publish to staging and require a human to tag. Content is never live without
  a decision, and the five minute budget is not met.
- Publish to production from `main`. The budget is met and the tag stops being
  the record of what is live.
- Rebuild from the most recent tag on a content webhook, leaving code releases
  on the tag flow. Meets the budget and keeps the tag meaningful, at the cost
  of a pipeline that resolves its own ref.

The third is the only one that satisfies what the document already promises.
It is also the only one that needs the pipeline to be cleverer than it is now.

## Impact

- `azure-pipelines.yml` gains a webhook resource and a way to build a tag it
  was not triggered by.
- The webhook secret is a secret pipeline variable, like the deployment token.
- Nothing about the site's output changes.
