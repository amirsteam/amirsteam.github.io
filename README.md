# amirlearner.me

Portfolio site of Amir Bahadur Shrestha, MERN stack developer and educator.
Live at **https://www.amirlearner.me**.

It is a static React site: there is no backend or database. All content
(projects, skills, services, experience, testimonials) lives in one file,
and the contact form emails messages through [Web3Forms](https://web3forms.com).

## Project structure

```
frontend/
├── public/              # Static files: resume.html, images, robots.txt, sitemap.xml
├── scripts/postbuild.js # Copies index.html for /contact/ and 404.html (GitHub Pages)
└── src/
    ├── data/index.js    # ← all site content: edit this to update the site
    ├── components/      # Layout (navbar, footer) and page sections
    ├── pages/           # Home, Contact, 404
    ├── hooks/           # usePageMeta (page titles and descriptions)
    └── lib/api.js       # Contact form → Web3Forms
```

## Tech stack

React 19 · Vite · Tailwind CSS v4 · Framer Motion · React Router · Lucide icons

## Run locally

```bash
cd frontend
cp .env.example .env   # add your Web3Forms key to test the contact form
npm install
npm run dev
```

## Update content

Edit `frontend/src/data/index.js` and push to `main`. Project screenshots go in
`frontend/public/projects/` (960×540 WebP works well).

## Deploy

Every push to `main` that changes `frontend/` builds the site and publishes it to
GitHub Pages. See [DEPLOYMENT.md](DEPLOYMENT.md).

## History

Until October 2026 this repo also held an Express/MongoDB API (`backend/`) and an
admin dashboard (`admin/`). They were retired to keep the site simple and free to
run; both are still in the git history if you need them.
