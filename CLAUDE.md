# my-portfolio

Personal portfolio site for Mateusz Bargiel, freelance full-stack contractor.
Single page, one conversion action: an email.

Product context is injected at session start by a `SessionStart` hook, from two
places:

- `docs/architecture.md` is committed. Decisions and the reasoning behind them.
- `.ai/notes.md` is gitignored. Audience, launch blockers, open questions.

**Nothing from `.ai/` may be copied into a committed file.** It is private
working material and some of it must not become public. Summarise a decision
into `docs/` if it belongs there, but never move text across. If the injected
context is missing, ask Mateusz rather than guessing.

## Stack

Next.js (App Router) + React + TypeScript, Sanity CMS, deployed to Azure Static
Web Apps as a static export (`output: 'export'`).

Only **projects** and **experience** come from Sanity. Everything else is in code.

Because the export is static, a Sanity publish webhook must trigger CI or content
edits never reach the live site.

## The design is a reference, not a spec

`.ai/design-reference.html` is the design starting point. It shows the
intended level of craft and the general direction. Layout, sections, tokens, and
copy may all change. Do not treat it as binding, and do not preserve a detail
purely because it is currently there.

All images in it are random placeholders. Mateusz is supplying real ones.

## Writing and design

Four skills carry the real guidance. Load them rather than improvising:

- **`portfolio-copy`** before writing any text a visitor reads.
- **`portfolio-ui`** before writing any JSX or CSS a visitor sees.
- **`portfolio-code`** before writing any TypeScript or React.
- **`portfolio-data`** before touching Sanity, GROQ, or data fetching.

`portfolio-code` sets the comment rule that matters most here, and it applies to
**every file in the repository**, not just TypeScript. Pipeline YAML, workflows,
shell scripts and config are all covered.

The default is no comment. Never narrate the code, and never justify a change.
A comment saying why a line was added is a commit message in the wrong place: it
reads as useful while the diff is on screen and as noise from then on. Record an
external constraint or a trap someone would otherwise reintroduce, and nothing
else.

Two rules apply everywhere, including chat responses, commits, and docs:

1. **No em dashes.** Also no ellipsis character, smart quotes, bullet character,
   or non-breaking space. A `PostToolUse` hook blocks these in written files.
   En dash in numeric ranges, middot as a separator, and arrows are fine.
2. **No AI-slop prose.** No "seamless", "robust", "leverage", "in today's
   landscape", no rule-of-three adjectives, no closing restatement paragraph.
   `portfolio-copy` has the full list and the reasoning.

## Branches

Conventional Branch (conventionalbranch.org), `<type>/<description>`.

| Type | For |
|---|---|
| `feat/` | new functionality |
| `fix/` | a defect on an unreleased or already-live build |
| `hotfix/` | a defect that gets tagged to production immediately |
| `chore/` | tooling, config, docs, CI, dependencies |
| `release/` | available, but unused here. Releases are cut from tags |

`main` carries no prefix. The description is lowercase `a-z`, `0-9`, and hyphens
between words. No underscores, no spaces, no leading, trailing, or doubled
hyphens. Dots only in a release version (`release/1.2.0`).

Branch types and commit types are separate vocabularies and are not expected to
line up. The prefix names what the branch is for; the commit type names what one
change did. A `chore/` branch normally carries `docs:`, `ci:` and `build:`
commits.

The spec's agent prefixes (`ai/`, `claude/`, and the rest) are deliberately not
used. Almost everything here is agent-assisted, so the prefix would displace the
purpose without adding anything the commit trailer does not already record.

## Commits

Conventional Commits, subject line only:
`type(scope)!: lowercase summary in the imperative`

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`,
`ci`, `chore`, `revert`. Scope is optional and names the area touched
(`hooks`, `sanity`, `ci`). `!` before the colon marks a breaking change.

Keep the subject under 72 characters and do not end it with a period. The body
is where reasoning goes: what the change is for and why this approach, not a
restatement of the diff. Wrap it at 80 columns.

Releases are cut from annotated semver tags, so the type carries weight. Use
`feat` and `fix` only for changes a visitor could notice.

## Pull requests

The description is read by people outside this project, now and years from now.
Write what changed and why, in terms a reader can check against the repository.

The title is the subject that lands on `main`, since merges are squashed, so it
follows Conventional Commits.

Never include how the change was found. No "while debugging", no "it turned out
that", no account of what was tried first. Internal task numbers, phase names,
and anything that only makes sense to someone who watched the work happen are
all noise to the reader and stale within a month. Evidence is welcome; a command
and its output earn their place. The story of arriving at them does not.

## Tooling

`context7` MCP is configured. Use it for current library documentation (Next.js,
Sanity, React) rather than relying on training memory.
