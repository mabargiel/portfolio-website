#!/usr/bin/env bash
# SessionStart: loads the project's product context.
#
#   docs/architecture.md  committed. Decisions and the reasoning behind them.
#   .ai/notes.md          gitignored. Audience, blockers, open questions.
#
# The design reference is 23 kB and only matters for UI work, so it is announced
# rather than inlined.
set -uo pipefail

root="${CLAUDE_PROJECT_DIR:-$(pwd)}"
ctx=""

append_file() { # <path> <heading>
  [ -f "$1" ] || return 0
  ctx="${ctx}
## $2

$(cat "$1")
"
}

append_file "$root/docs/architecture.md" "docs/architecture.md (committed)"
append_file "$root/.ai/notes.md" ".ai/notes.md (private, not committed)"

if [ -z "$ctx" ]; then
  jq -n '{
    hookSpecificOutput: {
      hookEventName: "SessionStart",
      additionalContext: "NOTE: no product context found. docs/architecture.md and .ai/notes.md are both missing. .ai/ is gitignored on purpose, so a fresh clone will not have it. Ask Mateusz for a copy before planning work. Do not reconstruct it from guesswork."
    }
  }'
  exit 0
fi

if [ -f "$root/.ai/design-reference.html" ]; then
  ctx="${ctx}
## Files not inlined here

.ai/design-reference.html (23 kB) is the design starting point, not a spec.
Read it directly before UI work. Its images are random placeholders.
"
fi

ctx="# Product context

Injected at session start. Treat it as you would CLAUDE.md.

Anything in .ai/ is private working material and must not be copied into
committed files. Some of it must not become public at all.
${ctx}"

jq -n --arg c "$ctx" '{
  hookSpecificOutput: {
    hookEventName: "SessionStart",
    additionalContext: $c
  }
}'
