#!/usr/bin/env bash
# SessionStart: loads the project's product context.
#
#   docs/architecture.md  committed. Decisions and the reasoning behind them.
#   .ai/notes.md          gitignored. Audience, blockers, open questions.
#   .ai/plan.md           gitignored. Phased delivery plan.
#
# Writes plain text to stdout, which SessionStart injects into context directly.
# The design reference is 23 kB and only matters for UI work, so it is announced
# rather than inlined.
set -uo pipefail

root="${CLAUDE_PROJECT_DIR:-$(pwd)}"

emit_file() { # <path> <heading>
  [ -f "$1" ] || return 0
  printf '\n## %s\n\n' "$2"
  cat "$1"
  printf '\n'
}

body=$(
  emit_file "$root/docs/architecture.md" "docs/architecture.md (committed)"
  emit_file "$root/.ai/notes.md" ".ai/notes.md (private, not committed)"
  emit_file "$root/.ai/plan.md" ".ai/plan.md (private, not committed)"
)

if [ -z "$body" ]; then
  cat <<'MISSING'
# Product context missing

docs/architecture.md and .ai/notes.md are both absent. .ai/ is gitignored on
purpose, so a fresh clone will not have it. Ask Mateusz for a copy before
planning work. Do not reconstruct it from guesswork.
MISSING
  exit 0
fi

cat <<'HEADER'
# Product context

Injected at session start. Treat it as you would CLAUDE.md.

Anything in .ai/ is private working material and must not be copied into
committed files. Some of it must not become public at all.
HEADER

printf '%s\n' "$body"

if [ -f "$root/.ai/design-reference.html" ]; then
  cat <<'REF'

## Files not inlined here

.ai/design-reference.html (23 kB) is the design starting point, not a spec.
Read it directly before UI work. Its images are random placeholders.
REF
fi
