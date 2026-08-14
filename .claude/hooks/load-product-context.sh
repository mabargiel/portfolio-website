#!/usr/bin/env bash
# SessionStart: injects the gitignored product context so every session starts
# oriented without the brief living in version control.
#
# The brief is injected in full (~7 kB). The design reference is 23 kB and is
# only needed for UI work, so it is announced rather than inlined.
set -uo pipefail

root="${CLAUDE_PROJECT_DIR:-$(pwd)}"
ai="$root/.ai"

if [ ! -d "$ai" ]; then
  jq -n '{
    hookSpecificOutput: {
      hookEventName: "SessionStart",
      additionalContext: "NOTE: .ai/ is missing. It holds this project'"'"'s brief and design reference and is deliberately gitignored, so a fresh clone will not have it. Ask Mateusz for a copy before planning any work. Do not reconstruct it from guesswork."
    }
  }'
  exit 0
fi

ctx="# Product context (from .ai/, gitignored)

This is injected at session start. It is the authoritative product context for
this repo. Treat it as you would CLAUDE.md.
"

if [ -f "$ai/brief.md" ]; then
  ctx="${ctx}
## .ai/brief.md

$(cat "$ai/brief.md")
"
fi

# Announce everything else in .ai/ without inlining it.
others=$(find "$ai" -maxdepth 1 -type f ! -name 'brief.md' -exec basename {} \; 2>/dev/null | sort)
if [ -n "$others" ]; then
  ctx="${ctx}
## Also in .ai/, read on demand

$(printf '%s' "$others" | sed 's|^|- .ai/|')

.ai/design-reference.html is the design starting point, not a spec. Read it
before UI work. Its images are random placeholders.
"
fi

jq -n --arg c "$ctx" '{
  hookSpecificOutput: {
    hookEventName: "SessionStart",
    additionalContext: $c
  }
}'
