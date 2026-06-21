# influence-chile

Sitio web de **Influence Chile** — community manager / agencia de marketing
(Next.js + React + TypeScript + Tailwind + framer-motion).

- **En vivo:** https://chileinfluence.cl
- **Hosting:** VPS propio (Ubuntu + nginx). El sitio se genera como **HTML estático**
  con `next build` (`output: 'export'`), por lo que no necesita Node en el servidor.

## Desarrollo local

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

Los datos del sitio (planes, stats, clientes, contacto) están centralizados en
[`lib/data.ts`](lib/data.ts) — edítalos ahí, no en los componentes.

## Build

```bash
pnpm build
```

Genera el sitio estático en la carpeta `out/`.

## Deploy al servidor

El sitio se sirve desde un VPS con nginx. Para publicar cambios:

```bash
pnpm build
SRV_PASS='<contraseña-del-servidor>' python scripts/deploy.py
```

`scripts/deploy.py` sube la carpeta `out/` por SFTP a `/var/www/influence-chile`
y recarga nginx. La contraseña se pasa por la variable de entorno `SRV_PASS`
(no se guarda en el repo).

Detalles de la infraestructura:

- **HTTPS:** Let's Encrypt (certbot), con renovación automática.
- **DNS:** `chileinfluence.cl` y `www` apuntan a la IP del VPS (gestionado en
  Cloudflare en modo *DNS only* — Cloudflare ya no sirve ni cachea el sitio).
- **Scripts auxiliares** (en `scripts/`): `srv.py` (ejecutar comandos por SSH),
  `deploy.py` (build + subida), `reboot_verify.py` (reiniciar y verificar).
  Todos usan `paramiko` y reciben la contraseña por `SRV_PASS`.
