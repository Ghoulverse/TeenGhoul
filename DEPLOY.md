# GOOGHOUL Deployment Guide

## Quick Start — Two Ways to Go Live

- **[Option A: Vercel](#option-a-vercel-recommended-for-beginners)** — Easiest setup, great DX, git-based deploys
- **[Option B: Cloudflare Pages](#option-b-cloudflare-pages-recommended-for-performance)** — Free unlimited bandwidth, global CDN, best raw performance

---

## Prerequisites

1. **Node.js 20+** installed locally (`node -v`)
2. A **GitHub repo** containing this project (push this code to GitHub)
3. Your domain: `googhoul.com` (or whichever domain you own)

---

## Option A: Vercel (Recommended for Beginners)

### Step 1: Create a Vercel Account
- Go to [vercel.com](https://vercel.com) and sign up with your GitHub account

### Step 2: Install Vercel CLI (optional but handy)
```bash
npm i -g vercel
```

### Step 3: Create the Project

**Via CLI:**
```bash
vercel
# Follow the prompts:
# - Link to existing project? No
# - Project name: googhoul
# - Directory: ./ (current)
# - Build Command: npm run build
# - Output Directory: dist
# - Framework: Other
```

**Via Dashboard:**
1. Click "Add New Project"
2. Import your GitHub repo
3. Configure:
   - **Framework Preset:** Other
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Root Directory:** `./` (leave default)
4. Click "Deploy"

### Step 4: Add Your Custom Domain
1. In the Vercel dashboard, go to your project → **Settings** → **Domains**
2. Enter `googhoul.com` and click "Add"
3. Vercel will show you DNS records to add:
   - **Option 1 (Recommended):** Use Vercel Nameservers
     - Go to your domain registrar (Namecheap, GoDaddy, Cloudflare, etc.)
     - Change nameservers to the ones Vercel provides
   - **Option 2:** Add an `A` record pointing to `76.76.21.21` and a `CNAME` for `www` pointing to `cname.vercel-dns.com`
4. Wait 5–60 minutes for DNS propagation
5. Vercel will auto-provision an SSL certificate (Let's Encrypt)

### Step 5: Enable GitHub Auto-Deploy (optional)
Your project is already configured. Every push to `main` will auto-deploy.

### GitHub Actions (Alternative to Vercel Git Integration)
If you prefer GitHub Actions over Vercel's native Git integration:

1. Get your Vercel tokens:
```bash
vercel login
vercel tokens create
```

2. Get your Org and Project IDs from `.vercel/project.json` after running `vercel link`

3. Add these as GitHub Secrets in your repo:
   - `Settings` → `Secrets and variables` → `Actions` → `New repository secret`
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

4. The workflow file is already at `.github/workflows/deploy-vercel.yml`

---

## Option B: Cloudflare Pages (Recommended for Performance)

### Step 1: Create a Cloudflare Account
- Go to [cloudflare.com](https://cloudflare.com) and sign up
- Add your domain to Cloudflare (follow their import wizard — change nameservers at your registrar)

### Step 2: Create a Pages Project
1. In the Cloudflare dashboard, go to **Workers & Pages** → **Create** → **Pages**
2. Choose **"Connect to Git"**
3. Select your GitHub repo
4. Configure build settings:
   - **Project name:** `googhoul`
   - **Production branch:** `main`
   - **Build command:** `npm run build`
   - **Build output directory:** `/dist`
5. Click **Save and Deploy**

### Step 3: Add Custom Domain
1. Go to your Pages project → **Custom domains**
2. Click **Set up a custom domain**
3. Enter `googhoul.com`
4. Cloudflare will add the DNS record automatically (since they manage your DNS)
5. SSL is automatic

### Step 4: GitHub Actions (Optional)
If you prefer deploying via GitHub Actions instead of Cloudflare's Git integration:

1. Create a Cloudflare API token:
   - Go to [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)
   - Click **Create Token**
   - Use the **"Edit Cloudflare Workers"** template
   - Permissions needed: `Cloudflare Pages:Edit`
   - Account Resources: Include your account
   - Zone Resources: Include your domain (or "All zones")
   - Copy the token

2. Get your Account ID:
   - On the right sidebar of any Cloudflare dashboard page, copy **Account ID**

3. Add GitHub Secrets:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`

4. The workflow file is already at `.github/workflows/deploy-cloudflare.yml`

---

## Manual Deploy (Emergency / Quick Test)

If you just want to upload the current `dist/` folder without CI:

### Vercel CLI
```bash
npm run build
vercel --prod
```

### Cloudflare Wrangler CLI
```bash
npm run build
npx wrangler pages deploy dist --project-name=googhoul
```

### Netlify Drop (Easiest One-Off)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `dist/` folder onto the page
3. Go to **Site settings** → **Domain management** → **Add custom domain**
4. Configure DNS as instructed

---

## Post-Deploy Checklist

- [ ] Site loads at `https://googhoul.com`
- [ ] `https://www.googhoul.com` redirects to the non-www (or vice versa — pick one)
- [ ] Security headers pass at [securityheaders.com](https://securityheaders.com/?q=googhoul.com)
- [ ] Links to `ghoulverse.com` work correctly
- [ ] Favicon loads
- [ ] No mixed-content warnings in browser console

---

## Troubleshooting

### Build fails on Vercel/Cloudflare
Make sure the build settings match:
- Build Command: `npm run build`
- Output Directory: `dist`
- Node Version: `20.x`

### Fonts not loading (CSP error)
If you see CSP errors for Google Fonts in the console, the `Content-Security-Policy` header or meta tag needs to allow `https://fonts.googleapis.com` and `https://fonts.gstatic.com`. This is already configured — if you customized the CSP, don't remove those domains.

### 404 on refresh (SPA routing)
This is handled automatically by the `vercel.json` config. For Cloudflare Pages, SPA routing works out of the box for static files. If you use Netlify, create a `public/_redirects` file with:
```
/* /index.html 200
```

### Game/iframe not working
GOOGHOUL doesn't have an iframe. If cross-domain issues appear after going live, verify the `ghoulverse.com` domain is actually live and responding.
