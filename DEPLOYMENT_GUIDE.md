# Deployment Guide: Static Site & Pages Functions

This guide covers how to deploy the **static Next.js application** with **Cloudflare Pages Functions** for the contact form.

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

## Part 1: Initial Setup

1. **Install Dependencies:**
   ```bash
   npm install
   ```
   *This installs `resend` and other project dependencies.*

2. **Verify Functions:**
   Ensure `functions/api/contact.ts` exists. This file handles the email sending logic automatically.

---

## Part 2: Deployment

1. **Build the Project:**
   Generate the static HTML files into the `out/` directory.
   ```bash
   npm run build
   ```

2. **Deploy to Cloudflare Pages:**
   This command uploads the `out` folder and the `functions` directory.
   ```bash
   npm run deploy
   ```

3. **Configure Environment Variables:**
   - Go to your project settings in the **Cloudflare Dashboard**.
   - Navigate to **Settings** > **Environment variables**.
   - Add a new variable:
     - **Variable name**: `RESEND_API_KEY`
     - **Value**: Your actual Resend API key.
     - **Variable name**: `TURNSTILE_SECRET_KEY`
     - **Value**: Your Cloudflare Turnstile Secret Key.
     - **Variable name**: `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
     - **Value**: Your Cloudflare Turnstile Site Key.
   - **Important**: You must redeploy (step 2) or use the dashboard to create a new deployment for the variable to take effect if added after initial deploy.

---

## Part 3: Verification

1. **Visit your Pages URL**.
2. **Go to the Contact Page** and send a test message.
3. **Check your Email** to confirm receipt.

## Troubleshooting

- **Form Error (500)**: Check if `RESEND_API_KEY` is set correctly in Cloudflare Dashboard.
- **Build Fails**: Ensure `out/` is generated.
- **Authentication Error**: If deployment fails with auth error, run `wrangler login` again or clear conflicting env vars: `$env:CLOUDFLARE_API_TOKEN = ""; npm run deploy`.
