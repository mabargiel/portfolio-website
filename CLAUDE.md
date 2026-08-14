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

`portfolio-code` sets the comment rule that matters most here: the default is no
comment. Never narrate the code or the process that produced it.

Two rules apply everywhere, including chat responses, commits, and docs:

1. **No em dashes.** Also no ellipsis character, smart quotes, bullet character,
   or non-breaking space. A `PostToolUse` hook blocks these in written files.
   En dash in numeric ranges, middot as a separator, and arrows are fine.
2. **No AI-slop prose.** No "seamless", "robust", "leverage", "in today's
   landscape", no rule-of-three adjectives, no closing restatement paragraph.
   `portfolio-copy` has the full list and the reasoning.

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

## Tooling

`context7` MCP is configured. Use it for current library documentation (Next.js,
Sanity, React) rather than relying on training memory.
