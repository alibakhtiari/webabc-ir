# Cloudflare Pages Deployment Guide

## ✅ Configuration Complete

Your React app is now configured for Cloudflare Pages deployment with custom middleware for redirects and geolocation.

## 📁 Project Structure

```
webabc-react/
├── functions/
│   └── _middleware.ts          # Cloudflare Pages Function for redirects
├── dist/                        # Build output (created by npm run build)
├── wrangler.toml               # Cloudflare Pages configuration
└── package.json
```

## 🚀 Deployment Steps

### Option 1: Deploy via Cloudflare Dashboard (Recommended)

1. **Build your project locally:**
   ```bash
   npm run build
   ```

2. **Go to Cloudflare Dashboard:**
   - Navigate to Pages
   - Click "Create a project"
   - Connect your Git repository (GitHub/GitLab)

3. **Configure build settings:**
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/` (leave empty)

4. **Deploy:**
   - Click "Save and Deploy"
   - Cloudflare will automatically build and deploy your site

### Option 2: Deploy via Wrangler CLI

1. **Build your project:**
   ```bash
   npm run build
   ```

2. **Deploy:**
   ```bash
   npm run deploy
   ```
   Or directly:
   ```bash
   wrangler pages deploy dist
   ```

## 🔧 What's Configured

### 1. **wrangler.toml**
- Configured for Cloudflare Pages
- Uses `pages_build_output_dir = "./dist"` to point to Vite's build output

### 2. **functions/_middleware.ts**
Handles:
- ✅ **WWW to non-WWW redirects** (301 permanent)
- ✅ **Geolocation-based language redirects** (302 temporary)
  - Persian countries (IR, AF, TJ) → `/fa`
  - Arabian countries → `/ar`
  - Others → `/en`

### 3. **Build Output**
- Vite builds to `./dist` directory
- Contains all static assets (HTML, CSS, JS, images)

## 🌍 How It Works

1. User visits your site
2. Cloudflare Pages Function (`_middleware.ts`) runs:
   - Checks if URL has `www.` → redirects to non-www
   - Checks user's country → redirects to appropriate language if no language in URL
3. Serves the static React app from `dist/`
4. React Router handles client-side routing

## 📝 Environment Variables (if needed)

If you need environment variables:

1. **In Cloudflare Dashboard:**
   - Go to your Pages project
   - Settings → Environment variables
   - Add variables for Production/Preview

2. **Access in your app:**
   ```typescript
   const apiKey = import.meta.env.VITE_API_KEY;
   ```

## ⚠️ Important Notes

1. **Build before deploy:** Always run `npm run build` before deploying
2. **Functions directory:** The `functions/` folder is automatically detected by Cloudflare Pages
3. **Worker.ts:** The old `src/worker.ts` file is no longer used (kept for reference)
4. **Custom domains:** Configure in Cloudflare Pages dashboard under "Custom domains"

## 🐛 Troubleshooting

### Build fails on Cloudflare
- Check build logs in Cloudflare dashboard
- Ensure Node.js version is compatible (set in dashboard if needed)
- Verify all dependencies are in `package.json`

### Redirects not working
- Check `functions/_middleware.ts` is deployed
- Verify the function logs in Cloudflare dashboard

### 404 errors on refresh
- This is handled automatically by Cloudflare Pages for SPAs
- The `dist/index.html` will be served for all routes

## 📚 Resources

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Pages Functions](https://developers.cloudflare.com/pages/platform/functions/)
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html)

---

**Your app is ready to deploy!** 🎉
