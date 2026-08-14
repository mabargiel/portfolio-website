#!/bin/sh
# Conventional Branch. See the Branches section of CLAUDE.md.
set -eu

branch="${1:-$(git rev-parse --abbrev-ref HEAD)}"

case "$branch" in
main | HEAD) exit 0 ;;
esac

if printf '%s' "$branch" | grep -Eq '^(feat|fix|hotfix|chore)/[a-z0-9]+(-[a-z0-9]+)*$'; then
  exit 0
fi

if printf '%s' "$branch" | grep -Eq '^release/[0-9]+\.[0-9]+\.[0-9]+$'; then
  exit 0
fi

cat >&2 <<EOF
Branch name does not follow Conventional Branch: $branch

  <type>/<description>   type: feat, fix, hotfix, chore
  release/<x.y.z>

Description is lowercase letters, digits, and single hyphens between words.
EOF
exit 1
