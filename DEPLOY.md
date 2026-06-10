# TEEN GHOUL — Deployment Guide

**Domain:** `https://www.teenghoul.com`  
**Description:** Teen & lifestyle cleaning products

---

## Build

```bash
npm install
npm run build
```

Output: `dist/` (Vite static build)

## Deploy

### Cloudflare Pages (Recommended)

```bash
npx wrangler pages deploy dist --project-name=teenghoul-com --branch=main
```

### GitHub Actions

Pushes to `main` auto-deploy via `.github/workflows/deploy.yml`.

### DNS

- `www.teenghoul.com` → CNAME → `teenghoul-com.pages.dev`
- `teenghoul.com` → CNAME → `teenghoul-com.pages.dev`

Managed in Cloudflare DNS.

---

*Part of the GHOULVERSE ecosystem. See root `DEPLOY.md` for ecosystem-wide deployment.*
