# Google SEO API credentials — local setup

GitHub: `docs/GOOGLE-API-SETUP.md`

These credentials power the `seo-google` / `blog-google` skills: PageSpeed Insights,
CrUX, Search Console, URL Inspection, Indexing API, GA4.

**No secret is committed to this repo.** This file documents *how to restore* the
config, never the values.

---

## Where the credentials live

```
/Users/alib/webabc-ir/.secrets/
├── google-api.json      # api_key, oauth_client_path, default_property   (mode 600)
├── oauth-client.json    # OAuth client_id + client_secret                (mode 600)
└── oauth-token.json     # minted by the consent flow; auto-refreshed     (mode 600)
```

`~/.config/claude-seo` is a **symlink** to `.secrets/`, so the skill tooling finds
the config at its hard-coded path and the OAuth token it writes later lands inside
the gitignored folder automatically. One copy, one location.

`.secrets/` is gitignored in `.gitignore`, alongside belt-and-braces patterns
(`*.googleusercontent.com.json`, `service_account.json`, `oauth-token.json`,
`google-api.json`) so a stray copy elsewhere in the tree still cannot be committed.

## Verified state (2026-10-05)

**Credential tier 1** — API key + OAuth token.

| API | Status | Evidence |
|---|---|---|
| PageSpeed Insights v5 | working | `/en/` → mobile 95 perf / 100 a11y / 100 SEO; desktop 100. `/en/tools/headline-analyzer/` → mobile 98 / desktop 100 |
| Chrome UX Report | reachable, **no data** | direct query returns `404 NOT_FOUND` — origin not in the CrUX dataset |
| Search Console | working | `sc-domain:webabc.ir` → 396 query rows, 37 clicks / 9,880 impressions over 28d |
| URL Inspection | working | `/en/tools/headline-analyzer/` → `PASS`, *Submitted and indexed*, crawled 2026-10-03 |
| Sitemaps | working | `sitemap-0.xml` + `sitemap.xml`, 0 errors, 0 warnings |
| Indexing API | credentialed, restricted | Google sanctions it for `JobPosting` / livestream video only — do not use it for normal pages |
| GA4 | not configured | add `ga4_property_id` to unlock organic-traffic reports |

CrUX returning `404` is **not** an auth failure. A disabled API returns
`403 SERVICE_DISABLED` and a bad key returns `400/403`. `404 NOT_FOUND` means the
API is enabled, the key is authorized, and webabc.ir simply has not crossed the
Chrome traffic threshold for field data. It cannot be fixed by configuration — so
the audit's proxy-only performance language stays honest.

## Completing Search Console

**Already done 2026-10-05.** To re-authorise (new Google account, revoked consent,
rotated client secret), run:

```bash
cd /Users/alib/.agents/skills/blog-google/scripts
python3 -u run.py google_auth.py --auth --creds /Users/alib/webabc-ir/.secrets/oauth-client.json
```

The command prints a consent URL and opens a browser. Sign in with the Google
account that **owns the `sc-domain:webabc.ir` Search Console property** and approve.
The token is written to `.secrets/oauth-token.json` at mode 600 and refreshes itself.

If the browser cannot reach `127.0.0.1:8085`, copy the full address-bar URL after
consenting and exchange the code manually:

```bash
python3 -u run.py google_auth.py --exchange \
  --creds /Users/alib/webabc-ir/.secrets/oauth-client.json --code 'PASTE_CODE'
```

The script's callback is `http://127.0.0.1:8085` while the OAuth client registers
`http://localhost`. That is fine — verified: Google's authorization server answers
`302` to the sign-in page rather than `redirect_uri_mismatch`, because it applies
loopback redirect rules for installed-app clients.

Verify afterwards:

```bash
python3 run.py google_auth.py --check
```

## Config shape

```json
{
  "api_key": "<GOOGLE_API_KEY>",
  "oauth_client_path": "/Users/alib/webabc-ir/.secrets/oauth-client.json",
  "default_property": "sc-domain:webabc.ir"
}
```

Environment-variable fallbacks are also honoured, so CI can avoid the file entirely:
`GOOGLE_API_KEY`, `GOOGLE_OAUTH_CLIENT_PATH`, `GSC_PROPERTY`,
`GOOGLE_APPLICATION_CREDENTIALS` (service account), `GA4_PROPERTY_ID`.

## Rotating

Both the API key and the OAuth client secret were pasted into a chat transcript at
setup time and should be treated as exposed. To rotate:

1. **API key** — GCP → APIs & Services → Credentials → rotate. Restrict it to
   PageSpeed Insights + Chrome UX Report (and Knowledge Graph if used).
2. **OAuth client** — GCP → Credentials → the OAuth client → delete, or regenerate
   the client secret. The old `client_secret` in `.secrets/oauth-client.json` stops
   working immediately.
3. Replace the values in `.secrets/google-api.json`, re-run the consent flow, and
   delete the stale `.secrets/oauth-token.json`.
