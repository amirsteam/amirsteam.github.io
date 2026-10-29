# Deployment

The site is static and hosted on **GitHub Pages** at https://www.amirlearner.me.
There is no server or database to run.

| Part | Where | Notes |
|------|-------|-------|
| Website | GitHub Pages | Built by `.github/workflows/deploy-frontend.yml` |
| Domain | `CNAME` file | `www.amirlearner.me` |
| Contact form | Web3Forms | Emails each message to you; no server needed |

## How a deploy happens

1. Push to `main` with changes under `frontend/` (or run the workflow by hand from
   the repository's **Actions** tab).
2. The workflow runs `npm ci` and `npm run build` in `frontend/`.
   `scripts/postbuild.js` then copies `index.html` to `contact/index.html` and
   `404.html`, so `/contact/` loads normally and unknown links reach the app's 404 page.
3. `frontend/dist` is published to GitHub Pages. It takes about a minute.

## One-time setup

1. **Settings → Pages:** set **Source** to **GitHub Actions** and turn on **Enforce HTTPS**.
2. **DNS:** point `www` with a CNAME record to `amirsteam.github.io`.

## Contact form (Web3Forms)

1. Get a free access key at https://web3forms.com using the email that should
   receive messages.
2. Put it in `.github/workflows/deploy-frontend.yml`:
   ```yaml
   env:
     VITE_WEB3FORMS_KEY: 'your-access-key'
   ```
   The key is public by design (it can only send email to you), so committing it is fine.
3. Push. Without a key, the form shows visitors email and WhatsApp buttons instead.

## Troubleshooting

- **Change not showing:** check the latest run in the **Actions** tab, then hard-refresh.
- **Old link preview on WhatsApp/LinkedIn/Facebook:** they cache previews. Refresh them
  with the Facebook Sharing Debugger or LinkedIn Post Inspector.
