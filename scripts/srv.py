#!/usr/bin/env python3
"""Conexión SSH al VPS de Influence usando paramiko (confiable en Windows).

Uso:
    SRV_PASS='la_contraseña' python scripts/srv.py "comando remoto"

La contraseña se pasa por la variable de entorno SRV_PASS (no se guarda aquí).
Usuario por defecto: ubuntu. Host por defecto: 207.210.102.190.
"""
import os
import sys
import paramiko

# La consola de Windows (cp1252) no soporta algunos caracteres Unicode (p. ej. →).
try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

host = os.environ.get("SRV_HOST", "207.210.102.190")
user = os.environ.get("SRV_USER", "ubuntu")
password = os.environ.get("SRV_PASS")
command = sys.argv[1] if len(sys.argv) > 1 else "echo conectado; whoami; hostname"

if not password:
    sys.exit("ERROR: define la contraseña en SRV_PASS")

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
try:
    client.connect(
        hostname=host,
        port=int(os.environ.get("SRV_PORT", "22")),
        username=user,
        password=password,
        look_for_keys=False,
        allow_agent=False,
        timeout=25,
    )
except Exception as e:
    sys.exit(f"ERROR de conexión: {type(e).__name__}: {e}")

stdin, stdout, stderr = client.exec_command(command, timeout=int(os.environ.get("SRV_TIMEOUT", "600")))
out = stdout.read().decode("utf-8", "replace")
err = stderr.read().decode("utf-8", "replace")
code = stdout.channel.recv_exit_status()
client.close()

if out:
    print(out, end="")
if err:
    print(err, end="", file=sys.stderr)
sys.exit(code)
