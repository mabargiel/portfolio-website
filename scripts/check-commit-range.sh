#!/bin/sh
# Runs check-commit-message.sh over every commit in a range.
# Usage: check-commit-range.sh <base-ref> <head-ref>
set -eu

base="$1"
head="$2"
dir=$(dirname "$0")

revs=$(git rev-list --no-merges "$base..$head")

if [ -z "$revs" ]; then
  echo "No commits to check between $base and $head."
  exit 0
fi

tmp=$(mktemp)
trap 'rm -f "$tmp"' EXIT

failed=0
for rev in $revs; do
  git log -1 --format=%B "$rev" > "$tmp"
  if "$dir/check-commit-message.sh" "$tmp"; then
    echo "ok   $(git log -1 --format='%h %s' "$rev")"
  else
    echo "FAIL $(git log -1 --format='%h %s' "$rev")"
    failed=1
  fi
done

exit "$failed"
