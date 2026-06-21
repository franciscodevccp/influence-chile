#!/usr/bin/env bash
# Conexión SSH al VPS de Influence (host: srv1576221.domos.cloud)
#
# Uso:
#   SRV_PASS='tu_contraseña' bash scripts/srv.sh '<comando remoto>'
#
# La contraseña se pasa por la variable de entorno SRV_PASS y NO se guarda
# en este archivo (no la subas a git). Usuario por defecto: ubuntu.
set -euo pipefail

SRV_USER="${SRV_USER:-ubuntu}"
SRV_HOST="${SRV_HOST:-207.210.102.190}"

if [ -z "${SRV_PASS:-}" ]; then
  echo "ERROR: define la contraseña en SRV_PASS" >&2
  exit 1
fi

REMOTE_CMD="${1:-echo conectado; whoami; hostname}"

# known_hosts temporal: evita conflictos cuando el servidor se reinstala
# y cambia su clave de host (no usar /dev/null, se rompe en Git Bash/Windows).
KH="$(mktemp)"
trap 'rm -f "$KH"' EXIT

sshpass -p "$SRV_PASS" ssh \
  -o StrictHostKeyChecking=accept-new \
  -o UserKnownHostsFile="$KH" \
  -o ConnectTimeout=25 \
  -o NumberOfPasswordPrompts=1 \
  -o PreferredAuthentications=password \
  -o PubkeyAuthentication=no \
  "${SRV_USER}@${SRV_HOST}" "$REMOTE_CMD"
