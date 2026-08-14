#!/usr/bin/env bash
# Flags AI-typography artifacts in files Claude writes.
#
# Banned (zero legitimate uses in this project's design):
#   em dash, ellipsis char, smart quotes, bullet char, non-breaking space
#
# Deliberately ALLOWED (load-bearing in the approved design):
#   en dash  U+2013  date ranges, "2023-2026"
#   middot   U+00B7  separators, "Frontiers · 2025"
#   arrow    U+2192  "-> now" tags
#
# Patterns are written as byte escapes so this script stays pure ASCII and
# can never match itself.
set -uo pipefail

payload=$(cat)
file=$(printf '%s' "$payload" | jq -r '.tool_response.filePath // .tool_input.file_path // empty' 2>/dev/null)

[ -n "$file" ] && [ -f "$file" ] || exit 0

case "$file" in
  */node_modules/*|*/.next/*|*/dist/*|*/build/*|*/.git/*|*lock.json|*.lock) exit 0 ;;
esac

# Only prose and source we author.
case "$file" in
  *.ts|*.tsx|*.js|*.jsx|*.mjs|*.cjs|*.html|*.css|*.scss|*.md|*.mdx|*.json|*.yml|*.yaml|*.txt) ;;
  *) exit 0 ;;
esac

emdash=$'\xe2\x80\x94'   ellipsis=$'\xe2\x80\xa6'  bullet=$'\xe2\x80\xa2'
lsquo=$'\xe2\x80\x98'    rsquo=$'\xe2\x80\x99'
ldquo=$'\xe2\x80\x9c'    rdquo=$'\xe2\x80\x9d'     nbsp=$'\xc2\xa0'

pattern="${emdash}|${ellipsis}|${bullet}|${lsquo}|${rsquo}|${ldquo}|${rdquo}|${nbsp}"

hits=$(grep -nE "$pattern" "$file" 2>/dev/null | head -15) || true
[ -n "$hits" ] || exit 0

names=""
add() {
  case "$hits" in *"$1"*) ;; *) return ;; esac        # char not present
  case ", ${names}," in *", $2,"*) return ;; esac     # already listed
  names="${names}${names:+, }$2"
}
add "$emdash" "em dash"
add "$ellipsis" "ellipsis char"
add "$bullet" "bullet char"
add "$lsquo" "smart quote"; add "$rsquo" "smart quote"
add "$ldquo" "smart quote"; add "$rdquo" "smart quote"
add "$nbsp" "non-breaking space"

reason="AI-typography artifacts in ${file}: ${names}.

$(printf '%s' "$hits")

Replace them: em dash -> restructure the sentence, or use a colon/period. Ellipsis char -> three periods. Smart quotes -> straight quotes. Bullet char -> a real list. Non-breaking space -> a normal space.
Leave en dash (numeric ranges), middot (separators) and arrow alone; those are correct typography, not AI tells."

jq -n --arg r "$reason" '{decision:"block", reason:$r}'
exit 0
