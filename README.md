# influence-chile

Sitio web de Influence Chile — community manager (Next.js).

## Cloudflare Pages

Este repositorio usa **`output: 'export'`**: el resultado del build es la carpeta **`out/`** (HTML estático). **No** coincide con Workers + OpenNext (`wrangler deploy`), que esperan otro tipo de build.

En **Cloudflare** → tu proyecto → **Settings → Builds**:

| Campo | Valor |
|--------|--------|
| **Build command** | `pnpm install && pnpm run build` |
| **Build output directory** | `out` |
| **Deploy command** | *(vacío / ninguno)* — **Cloudflare Pages ya publica la carpeta `out` después del build.** |

**No uses `npx wrangler deploy`** en este proyecto: es para **Workers** (necesita script JS o carpeta de assets mal configurada) y en Pages muestra avisos como *“use `wrangler pages deploy` instead”* y errores tipo *“Missing entry-point to Worker script”*.

Si tu panel obliga a un comando de deploy, sustitúyelo por:

```text
npx wrangler pages deploy ./out --project-name=influence-chile
```

(no `wrangler deploy`). El `wrangler.toml` del repo incluye `[assets] directory = "./out"` por si el entorno sigue ejecutando `wrangler deploy` tras el build.

Para desplegar por CLI con la carpeta estática:

```bash
pnpm run build
pnpm exec wrangler pages deploy ./out --project-name=influence-chile
```

(Requiere `wrangler` en el proyecto o `npx wrangler`, y autenticación con Cloudflare.)
