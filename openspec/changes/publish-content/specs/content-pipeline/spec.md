## ADDED Requirements

### Requirement: The studio is reachable without a checkout

The Sanity studio SHALL be deployed and reachable at a URL, so editing content
requires a browser and a Sanity login rather than a clone and a dev server.

#### Scenario: An editor changes a project description

- **WHEN** someone with studio access opens the studio URL and publishes a change
- **THEN** the change is stored in the dataset, with no developer involved

### Requirement: Publishing content rebuilds the site

Publishing in the studio SHALL trigger the pipeline, so an edit reaches the
deployed site without a developer.

#### Scenario: A description is corrected

- **WHEN** an editor publishes a change to a project or experience document
- **THEN** the pipeline runs, the gates run against the rebuilt export, and the
  site serves the new content

#### Scenario: The gates fail on rebuilt content

- **WHEN** a content rebuild fails a gate
- **THEN** nothing is deployed, and the previously deployed site keeps serving

### Requirement: A content rebuild does not create a version

A pipeline run triggered by a content publish SHALL NOT produce a new version
number. The footer's version SHALL continue to report the release the code came
from.

#### Scenario: Content changes between releases

- **WHEN** content is published while production is serving v1.2.0
- **THEN** the rebuilt site still reports v1.2.0, with the commit unchanged
