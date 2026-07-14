#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# One-shot deploy to Hostinger shared hosting via SSH.
#
# What it does:
#   1. Runs `npm run build` (produces ./out with NEXT_PUBLIC_SITE_URL baked in)
#   2. Streams ./out over SSH as a tar pipe (single connection, one password
#      prompt) into ~/public_html on the server
#   3. Wipes stale files at the destination first, preserving .well-known/
#      (Hostinger uses that for SSL cert verification)
#
# Usage:
#   ./deploy.sh                # build + deploy
#   ./deploy.sh --skip-build   # deploy the current ./out as-is
#
# On Windows: run from Git Bash (comes with `git`), not cmd/PowerShell.
# ---------------------------------------------------------------------------
set -euo pipefail

# ---- Configuration -------------------------------------------------------
DOMAIN="${DEPLOY_DOMAIN:-getnextsite.com}"
SSH_HOST="${DEPLOY_SSH_HOST:-45.137.159.112}"
SSH_USER="${DEPLOY_SSH_USER:-u436631933}"
SSH_PORT="${DEPLOY_SSH_PORT:-65002}"
REMOTE_DIR="${DEPLOY_REMOTE_DIR:-public_html}"

# ---- Colors --------------------------------------------------------------
if [ -t 1 ]; then
  B=$'\033[1m'; C=$'\033[36m'; G=$'\033[32m'; Y=$'\033[33m'; R=$'\033[31m'; N=$'\033[0m'
else
  B=''; C=''; G=''; Y=''; R=''; N=''
fi

SKIP_BUILD=false
for arg in "$@"; do
  case "$arg" in
    --skip-build) SKIP_BUILD=true ;;
    --help|-h)
      grep '^#' "$0" | head -25
      exit 0 ;;
  esac
done

# ---- Sanity checks -------------------------------------------------------
command -v ssh >/dev/null || { echo "${R}ssh not found. Install OpenSSH.${N}"; exit 1; }
command -v tar >/dev/null || { echo "${R}tar not found.${N}"; exit 1; }

# ---- Build ---------------------------------------------------------------
if [ "$SKIP_BUILD" = false ]; then
  echo "${B}${C}→ Building for https://$DOMAIN ...${N}"
  NEXT_PUBLIC_SITE_URL="https://$DOMAIN" npm run build
else
  echo "${Y}→ Skipping build (--skip-build). Using existing ./out${N}"
fi

if [ ! -d out ]; then
  echo "${R}./out folder not found. Run without --skip-build first.${N}"
  exit 1
fi

# ---- Show what will be uploaded -----------------------------------------
FILE_COUNT=$(find out -type f | wc -l)
SIZE=$(du -sh out | awk '{print $1}')
echo ""
echo "${B}${C}→ Uploading ${FILE_COUNT} files (${SIZE}) to${N}"
echo "  ${SSH_USER}@${SSH_HOST}:${REMOTE_DIR}/  (port ${SSH_PORT})"
echo ""
echo "${Y}You'll be prompted for the SSH password once.${N}"
echo ""

# ---- Deploy: tar over SSH -----------------------------------------------
# - mkdir the remote dir (no-op if exists)
# - cd there
# - remove existing entries EXCEPT .well-known and cgi-bin
# - extract the tar stream
tar -cf - -C out . | ssh -p "$SSH_PORT" "${SSH_USER}@${SSH_HOST}" "\
  mkdir -p \"\$HOME/${REMOTE_DIR}\" && \
  cd \"\$HOME/${REMOTE_DIR}\" && \
  find . -mindepth 1 -maxdepth 1 \
    -not -name '.well-known' \
    -not -name 'cgi-bin' \
    -exec rm -rf {} + && \
  tar -xf - && \
  echo '  ↳ extracted on server'"

echo ""
echo "${G}✓ Deployed.${N}"
echo "  Visit ${B}https://$DOMAIN${N}"
echo ""
echo "  If DNS just changed, allow 5–60 minutes for propagation."
echo "  Hard refresh in your browser with Ctrl+F5."
