// GitHub Pages has no SPA fallback. Copy index.html so that:
// - each page (/projects/, /contact/, ...) is served with status 200 so search engines index it
// - the dashboard's fixed pages (/admin/profile, /admin/projects/new, ...) load with 200 on reload
// - any other unknown path gets 404.html, which loads the app's 404 page
//   (single dashboard items like /admin/projects/<id> still work through it)
import { copyFileSync, mkdirSync } from 'node:fs'

const pages = ['projects', 'services', 'about', 'skills', 'contact']

const adminResources = ['projects', 'services', 'skills', 'experience', 'education', 'testimonials']
const adminPages = [
  'admin',
  ...['login', 'profile', 'messages', 'account'].map((p) => `admin/${p}`),
  ...adminResources.flatMap((r) => [`admin/${r}`, `admin/${r}/new`])
]

for (const route of [...pages, ...adminPages]) {
  mkdirSync(`dist/${route}`, { recursive: true })
  copyFileSync('dist/index.html', `dist/${route}/index.html`)
}
copyFileSync('dist/index.html', 'dist/404.html')
