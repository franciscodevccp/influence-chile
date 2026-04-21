# influence-chile

Sitio web de Influence Chile — community manager (Next.js).

## Cloudflare Pages

Este repositorio usa **`output: 'export'`**: el resultado del build es la carpeta **`out/`** (HTML estático). **No** coincide con Workers + OpenNext (`wrangler deploy`), que esperan otro tipo de build.

En **Cloudflare** → tu proyecto → **Settings → Builds**:

| Campo | Valor |
|--------|--------|
| **Build command** | `pnpm install && pnpm run build` |
| **Build output directory** | `out` |
| **Deploy command** | *(vacío / ninguno)* |

Si antes configuraste **`npx wrangler deploy`**, quítalo: dispara la plantilla Next+OpenNext y falla con `pages-manifest.json` porque aquí no hay modo `standalone`.

Para desplegar por CLI con la carpeta estática:

```bash
pnpm run build
pnpm exec wrangler pages deploy ./out --project-name=influence-chile
```

(Requiere `wrangler` en el proyecto o `npx wrangler`, y autenticación con Cloudflare.)
