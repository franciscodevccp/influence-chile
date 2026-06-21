#!/usr/bin/env python3
"""Reinicia el servidor y espera a que vuelva, luego verifica el estado."""
import os
import sys
import time
import socket
import paramiko

host = os.environ.get("SRV_HOST", "207.210.102.190")
user = os.environ.get("SRV_USER", "ubuntu")
password = os.environ.get("SRV_PASS")
if not password:
    sys.exit("ERROR: define SRV_PASS")


def connect():
    c = paramiko.SSHClient()
    c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    c.connect(hostname=host, port=22, username=user, password=password,
              look_for_keys=False, allow_agent=False, timeout=10)
    return c


# 1) disparar el reinicio
try:
    c = connect()
    c.exec_command("sudo systemctl reboot")
    time.sleep(1)
    c.close()
    print("Reinicio enviado. Esperando a que el servidor vuelva...")
except Exception as e:
    print(f"(aviso al enviar reboot: {e})")

# 2) esperar a que se caiga y vuelva
time.sleep(15)
deadline = time.time() + 180
ok = False
while time.time() < deadline:
    try:
        c = connect()
        ok = True
        break
    except Exception:
        time.sleep(5)

if not ok:
    sys.exit("ERROR: el servidor no volvió a responder en 180s")

# 3) verificar estado tras el reinicio
cmd = (
    'echo "=== uptime ==="; uptime; '
    'echo "=== RAM (deberia haber MAS libre sin GUI) ==="; free -h | head -2; '
    'echo "=== modo de arranque ==="; systemctl get-default; '
    'echo "=== nginx ==="; systemctl is-active nginx; '
    'echo "=== firewall ==="; sudo ufw status | head -1; '
    'echo "=== HTTP local ==="; curl -s -o /dev/null -w "HTTP %{http_code}\\n" http://localhost; '
    'echo "=== escritorio activo? (deberia decir inactive/dead) ==="; systemctl is-active gdm 2>/dev/null || echo "gdm no activo"'
)
_in, out, err = c.exec_command(cmd, timeout=60)
print(out.read().decode("utf-8", "replace"), end="")
e = err.read().decode("utf-8", "replace")
if e:
    print(e, end="", file=sys.stderr)
c.close()
print("=== SERVIDOR OK TRAS REINICIO ===")
