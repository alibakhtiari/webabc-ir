# Deployment Guide: Static Site & Email Worker

This guide covers how to deploy the **static Next.js application** to **Cloudflare Pages** and the **email handling Worker** to **Cloudflare Workers**.

## Prerequisites

- **Cloudflare Account**: [Sign up here](https://dash.cloudflare.com/sign-up).
- **Node.js & npm**: Installed on your machine.
- **Wrangler CLI**: Cloudflare's command-line tool.
  ```bash
  npm install -g wrangler
  wrangler login
  ```
- **Resend API Key**: [Get one here](https://resend.com/).

---

## Part 1: Deploying the Email Worker (Backend)

The contact form relies on this worker to send emails. We deploy it first to get the URL.

1. **Navigate to the API directory:**
   ```bash
   cd api
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set the Resend API Key Secret:**
   This securely stores your API key in Cloudflare.
   ```bash
   wrangler secret put RESEND_API_KEY
   ```
   *Enter your Resend API key when prompted.*

4. **Deploy the Worker:**
   ```bash
   wrangler deploy
   ```
   *Note the URL output at the end (e.g., `https://contact-worker.your-subdomain.workers.dev`). You will need this.*

---

## Part 2: Configuring the Frontend

1. **Navigate back to the project root:**
   ```bash
   cd ..
   ```

2. **Configure the Worker URL:**
   Create or edit `.env.production` (or `.env.local` for local testing) and add your worker URL:
   ```env
   NEXT_PUBLIC_WORKER_URL=https://your-worker-name.your-subdomain.workers.dev
   ```
   *Note: Since we are doing a static export, this value is baked into the HTML at build time. If you change it, you must rebuild.*

---

## Part 3: Deploying the Static Site (Frontend)

1. **Build the Project:**
   Generate the static HTML files into the `out/` directory.
   ```bash
   npm run build
   ```
   *Ensure the build completes successfully.*

2. **Deploy to Cloudflare Pages:**
   This command uploads the `out` folder to Cloudflare Pages.
   ```bash
   npm run deploy
   ```
   *(This runs `wrangler pages deploy out` under the hood).*

3. **Follow the Prompts:**
   - Select your Cloudflare account.
   - You can create a new project (e.g., `webabc-next`) or select an existing one.

---

## Part 4: Verification

1. **Visit your Pages URL** (provided after step 3).
2. **Go to the Contact Page** and send a test message.
3. **Check your Email** to confirm receipt (check spam folders too).
4. **Check Worker Logs** (if needed):
   Go to Cloudflare Dashboard > Workers & Pages > `contact-worker` > Logs to see real-time execution logs.

## Troubleshooting

- **Form doesn't send/404 Error**: Ensure `NEXT_PUBLIC_WORKER_URL` is correct and you ran `npm run build` *after* setting it.
- **CORS Error**: The worker is configured to allow requests from any origin (`*`). If you changed this, ensure your Pages domain is allowed.
- **Build Fails**: Run `npm run build` locally to see error details. Ensure `api/` folder is excluded from `tsconfig.json` (already configured).
