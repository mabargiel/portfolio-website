## ADDED Requirements

### Requirement: The page offers exactly one conversion action

The page SHALL present a single conversion action, an email link, and MUST NOT
present a contact form or any alternative submission path.

#### Scenario: A visitor decides to make contact

- **WHEN** a visitor reaches the contact section
- **THEN** an email link is present and activating it opens a message to the
  published address

#### Scenario: No backend is implied

- **WHEN** the page is inspected for submission paths
- **THEN** there is no form, no endpoint, and nothing that would require a server

### Requirement: Outbound links point somewhere real

Every link the page presents SHALL resolve to a real destination.

#### Scenario: A placeholder link survives to the build

- **WHEN** any anchor has `href="#"` or points at a placeholder host
- **THEN** it is a defect, since the reference design ships such links and they
  are easy to carry over unnoticed
