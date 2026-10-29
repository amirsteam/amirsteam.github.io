# Deployment

| Part | Where | Cost |
|------|-------|------|
| Website (and `/admin`) | GitHub Pages, built by `.github/workflows/deploy-frontend.yml` | Free |
| CMS API | Render web service, defined in `render.yaml` | Free (sleeps when idle) |
| Database | MongoDB Atlas M0 cluster | Free |
| Contact email | Web3Forms | Free |

Until the setup below is done, the site keeps working with its built-in content
(`frontend/src/data/defaults.js`), and `/admin` shows a sign-in page that can't
reach a server.

## One-time setup

### 1. MongoDB Atlas (database)

1. Sign in at https://cloud.mongodb.com and create a free **M0** cluster
   (region close to Render's Singapore, e.g. Mumbai or Singapore).
2. **Database Access** → add a database user with a strong password.
3. **Network Access** → add `0.0.0.0/0` (Render's free plan has no fixed IP;
   the database user's password protects it).
4. **Connect → Drivers** → copy the connection string, replace `<password>`, and
   add the database name before the `?`, e.g.
   `mongodb+srv://amir:PASSWORD@cluster0.abcde.mongodb.net/portfolio?retryWrites=true&w=majority`

### 2. GitHub token (for the Publish button)

1. GitHub → **Settings → Developer settings → Fine-grained tokens → Generate new token**.
2. Repository access: **Only select repositories** → `amirsteam/amirsteam.github.io`.
3. Permissions → Repository → **Contents: Read and write**. Nothing else.
4. Set an expiry you'll remember (e.g. 1 year) and copy the token.

### 3. Render (API)

1. Sign in at https://render.com with GitHub.
2. **New → Blueprint** → select this repository. Render reads `render.yaml`.
3. Fill in the values it asks for:
   - `MONGODB_URI`: the Atlas connection string from step 1
   - `ADMIN_EMAIL` / `ADMIN_PASSWORD`: your dashboard login (password 10+ characters)
   - `GITHUB_TOKEN`: the token from step 2
4. Deploy. On first start the API creates your admin account and fills the empty
   database with the site's current content.
5. Copy the service URL (e.g. `https://amirlearner-api.onrender.com`) and check
   `https://amirlearner-api.onrender.com/api/health` shows `"db":"connected"`.

### 4. Connect the site to the API

1. GitHub repository → **Settings → Secrets and variables → Actions → Variables**
   → **New repository variable**:
   - Name: `CONTENT_API_URL`
   - Value: your Render URL plus `/api`, e.g. `https://amirlearner-api.onrender.com/api`
2. **Actions → Deploy Frontend to GitHub Pages → Run workflow** (or press Publish
   in the dashboard). From now on the site is built from the CMS content.

### 5. Contact email (optional but recommended)

Get a free access key at https://web3forms.com and put it in
`.github/workflows/deploy-frontend.yml` as `VITE_WEB3FORMS_KEY`. The key is public
by design. Without it, messages still reach `/admin/messages`.

## Everyday use

1. Go to https://www.amirlearner.me/admin and sign in. The first request of the day
   can take up to a minute while Render wakes the server.
2. Edit **Profile**, **Projects**, **Services**, **Skills**, **Experience**,
   **Education** or **Testimonials**, and press **Save**. Untick **Show on the site**
   to keep something as a draft.
3. Press **Publish site**. Watch progress in the repository's **Actions** tab; the
   site updates in about 2 minutes.

Project screenshots are files in `frontend/public/projects/` (960×540 WebP works
well); in the dashboard, enter the path, e.g. `/projects/my-project.webp`.

## How a deploy works

`deploy-frontend.yml` runs on code pushes to `main` (under `frontend/`), on the
Publish button (`repository_dispatch: cms-publish`) and by hand. It:

1. installs and **lints** (a lint error stops the deploy),
2. **fetches** `/api/content` into `frontend/src/data/cms.json`. If the API can't be
   reached after ~2 minutes of retries, the deploy stops and the live site stays as it was,
3. **builds**, copying `index.html` for each page so every URL returns 200,
4. publishes to GitHub Pages.

## Security notes

- Admin sign-in uses a JWT that expires after 8 hours, kept in `sessionStorage`
  (cleared when the browser closes). Passwords are hashed with bcrypt.
- Sign-in is limited to 10 attempts per 15 minutes; the contact form to 5 messages
  per hour per connection.
- The API only accepts browser requests from `ALLOWED_ORIGINS`.
- Change your password any time under **Password** in the dashboard.

## Troubleshooting

- **Dashboard says it can't reach the server:** the free server is waking up; wait
  30–60 seconds and retry. Check `/api/health` on your Render URL.
- **Publish says "not set up":** `GITHUB_TOKEN` is missing on Render.
- **Publish says GitHub refused:** the token expired or lacks Contents: write.
- **Deploy failed at "Fetch CMS content":** the API was down; open the Render
  dashboard, then re-run the workflow.
