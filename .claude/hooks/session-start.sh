#!/bin/bash
# SessionStart hook: install @higgsfield/cli.
#
# A plain `npm install -g @higgsfield/cli` hangs forever: the package's
# postinstall (install.js) downloads the `hf` binary over HTTPS without a
# timeout and never destroys the socket, so the Node process never exits.
# We work around it by installing with --ignore-scripts and fetching the
# vendor binary ourselves (which is all the postinstall actually does).
set -euo pipefail

# Only run in the remote (Claude Code on the web) environment.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Idempotent: skip if a working hf binary is already in place.
PKG="$(npm root -g)/@higgsfield/cli"
if [ -x "$PKG/vendor/hf" ] && "$PKG/vendor/hf" --version >/dev/null 2>&1; then
  echo "@higgsfield/cli already installed: $("$PKG/vendor/hf" --version)"
  exit 0
fi

echo ">>> Installing @higgsfield/cli (--ignore-scripts to skip the hanging postinstall)"
npm install -g @higgsfield/cli --ignore-scripts

PKG="$(npm root -g)/@higgsfield/cli"
VER="$(node -e "console.log(require('$PKG/package.json').version)")"

# Map platform/arch the same way the package's install.js does.
case "$(uname -s)" in
  Linux)  PLATFORM=linux ;;
  Darwin) PLATFORM=darwin ;;
  *) echo "@higgsfield/cli: unsupported platform $(uname -s)" >&2; exit 1 ;;
esac
case "$(uname -m)" in
  x86_64|amd64) ARCH=amd64 ;;
  arm64|aarch64) ARCH=arm64 ;;
  *) echo "@higgsfield/cli: unsupported arch $(uname -m)" >&2; exit 1 ;;
esac

echo ">>> Fetching hf vendor binary (v${VER} ${PLATFORM}/${ARCH})"
mkdir -p "$PKG/vendor"
URL="https://github.com/higgsfield-ai/cli/releases/download/v${VER}/hf_${VER}_${PLATFORM}_${ARCH}.tar.gz"
TMP="$(mktemp)"
curl -fsSL -m 120 -o "$TMP" "$URL"
tar -xzf "$TMP" -C "$PKG/vendor" hf
chmod 755 "$PKG/vendor/hf"
rm -f "$TMP"

cat > "$PKG/vendor/install.json" <<JSON
{
  "install_method": "npm",
  "package_manager": "npm",
  "package_name": "@higgsfield/cli",
  "version": "$VER"
}
JSON

echo ">>> @higgsfield/cli installed: $("$PKG/vendor/hf" --version)"
