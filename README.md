# amirlearner.me

Portfolio site of Amir Bahadur Shrestha, MERN stack developer and educator.
Live at **https://www.amirlearner.me**, with a content dashboard at **/admin**.

## How it works

```
 /admin dashboard ──edit──▶ CMS API (Render) ──▶ MongoDB Atlas
        │                         ▲
        └── "Publish site" ──▶ GitHub Actions ──fetch /api/content──┘
                                   │
                                   ▼ build
                         www.amirlearner.me (GitHub Pages, static)
```

- **Visitors** get a static site from GitHub Pages. It never calls the API, so it
  stays fast and keeps working even when the free API server is asleep or down.
- **You** edit content at `/admin` (stored in MongoDB), then press **Publish site**.
  GitHub Actions pulls the published content from the API, rebuilds the site and
  deploys it in about 2 minutes.
- **Contact form** messages are emailed through Web3Forms (when its key is set) and
  saved to the admin inbox (`/admin/messages`).

## Project structure

```
frontend/                  React 19 + Vite + Tailwind CSS v4 (site and /admin)
├── src/data/defaults.js   Built-in content: fallback and starter data for MongoDB
├── src/data/cms.json      Published CMS content, written at build time (keep as {})
├── src/data/index.js      Merges cms.json over defaults.js
├── src/pages/             Home, Projects, Services, About, Skills, Contact, 404
├── src/admin/             The CMS dashboard (loaded only on /admin)
└── scripts/               fetch-content.js (build) and postbuild.js (GitHub Pages)

backend/                   Express 5 + Mongoose API
├── src/models/            Projects, services, skills, experience, education,
│                          testimonials, profile, messages, admin
├── src/routes/            public (/content, /contact), auth, admin
├── scripts/dev-memory.js  Run locally with a throwaway in-memory MongoDB
└── test/                  API tests (npm test)

render.yaml                One-click setup of the API on Render
DESIGN.md                  Colors, type, spacing and component rules
```

## Run locally

```bash
# 1. API with a throwaway database (prints a local admin login)
cd backend
npm install
npm run dev:memory

# 2. Site and dashboard (in another terminal)
cd frontend
npm install
echo VITE_API_URL=http://localhost:5000/api > .env
npm run dev
```

Open http://localhost:5173 for the site and http://localhost:5173/admin for the
dashboard. To see CMS content on the local site, run
`CONTENT_API_URL=http://localhost:5000/api npm run fetch-content` in `frontend/`
(and reset `src/data/cms.json` to `{}` before committing).

## Tests

```bash
cd backend && npm test      # API: auth, editing, publishing, contact, security
cd frontend && npm run lint
```

## Deploy

See [DEPLOYMENT.md](DEPLOYMENT.md) for the one-time setup (MongoDB Atlas, Render,
GitHub token) and how publishing works.
