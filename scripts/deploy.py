#!/usr/bin/env python3
"""Despliega el sitio estático (carpeta out/) al VPS y configura nginx.

Uso:
    pnpm build                       # genera out/
    SRV_PASS='...' python scripts/deploy.py

Variables: SRV_PASS (obligatoria), SRV_HOST, SRV_USER, LOCAL_DIR, REMOTE_DIR.
Sube out/ a /var/www/influence-chile y deja nginx sirviéndolo.
"""
import os
import sys
import base64
import posixpath
import paramiko

host = os.environ.get("SRV_HOST", "207.210.102.190")
user = os.environ.get("SRV_USER", "ubuntu")
password = os.environ.get("SRV_PASS")
if not password:
    sys.exit("ERROR: define SRV_PASS")

LOCAL_DIR = os.environ.get("LOCAL_DIR", "out")
REMOTE_DIR = os.environ.get("REMOTE_DIR", "/var/www/influence-chile")

if not os.path.isdir(LOCAL_DIR):
    sys.exit(f"ERROR: no existe la carpeta '{LOCAL_DIR}'. Corre 'pnpm build' primero.")


def run(client, cmd, timeout=120):
    _in, out, err = client.exec_command(cmd, timeout=timeout)
    o = out.read().decode("utf-8", "replace")
    e = err.read().decode("utf-8", "replace")
    code = out.channel.recv_exit_status()
    return code, o, e


client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(hostname=host, port=22, username=user, password=password,
               look_for_keys=False, allow_agent=False, timeout=25)

print("== Preparando carpeta remota ==")
code, o, e = run(client, f"sudo rm -rf {REMOTE_DIR} && sudo mkdir -p {REMOTE_DIR} "
                         f"&& sudo chown -R {user}:{user} {REMOTE_DIR} && echo OK")
print((o + e).strip())

print("== Subiendo archivos por SFTP ==")
sftp = client.open_sftp()


def ensure_remote_dir(d):
    parts = d.strip("/").split("/")
    cur = ""
    for p in parts:
        cur += "/" + p
        try:
            sftp.stat(cur)
        except IOError:
            sftp.mkdir(cur)


count = 0
for root_, dirs, files in os.walk(LOCAL_DIR):
    rel = os.path.relpath(root_, LOCAL_DIR)
    remote_root = REMOTE_DIR if rel == "." else posixpath.join(REMOTE_DIR, rel.replace("\\", "/"))
    ensure_remote_dir(remote_root)
    for f in files:
        sftp.put(os.path.join(root_, f), posixpath.join(remote_root, f))
        count += 1
sftp.close()
print(f"   {count} archivos subidos a {REMOTE_DIR}")

print("== Recargando nginx ==")
# Si certbot ya configuró HTTPS, NO se reescribe el config (lo gestiona certbot):
# solo se recarga nginx para servir los archivos nuevos. Así no se borra el bloque SSL.
_c, ssl_out, _e = run(
    client,
    "test -f /etc/letsencrypt/live/chileinfluence.cl/fullchain.pem && echo SSL || echo NOSSL",
)

if "SSL" in ssl_out:
    code, o, e = run(
        client,
        "sudo nginx -t && sudo systemctl reload nginx && echo 'NGINX_OK (config HTTPS conservada)'",
    )
    print((o + e).strip())
else:
    nginx_conf = """server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name chileinfluence.cl www.chileinfluence.cl _;
    root /var/www/influence-chile;
    index index.html;

    location /_next/static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location / {
        try_files $uri $uri.html $uri/ =404;
    }

    error_page 404 /404.html;
}
"""
    b64 = base64.b64encode(nginx_conf.encode()).decode()
    cmd = (
        f"echo {b64} | base64 -d | sudo tee /etc/nginx/sites-available/influence-chile >/dev/null && "
        "sudo ln -sf /etc/nginx/sites-available/influence-chile /etc/nginx/sites-enabled/influence-chile && "
        "sudo rm -f /etc/nginx/sites-enabled/default && "
        "sudo nginx -t && sudo systemctl reload nginx && echo NGINX_OK"
    )
    code, o, e = run(client, cmd)
    print((o + e).strip())

client.close()
print("== DEPLOY TERMINADO ==" if code == 0 else "== DEPLOY CON ERRORES (revisa arriba) ==")
