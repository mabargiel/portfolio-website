#!/bin/sh
# Conventional Commits. See the Commits section of CLAUDE.md.
set -eu

subject=$(sed -n '1p' "$1")

case "$subject" in
"Merge "* | "Revert "* | "fixup!"* | "squash!"*) exit 0 ;;
esac

types='feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert'
failed=0

if ! printf '%s' "$subject" | grep -Eq "^($types)(\([a-z0-9-]+\))?!?: .+"; then
  echo "Subject must be '<type>(<scope>)!: <summary>', type one of:" >&2
  echo "  $types" >&2
  failed=1
fi

if [ "${#subject}" -gt 72 ]; then
  echo "Subject is ${#subject} characters, the limit is 72." >&2
  failed=1
fi

case "$subject" in
*.)
  echo "Subject must not end with a period." >&2
  failed=1
  ;;
esac

if [ "$failed" -ne 0 ]; then
  echo >&2
  echo "  $subject" >&2
  exit 1
fi
