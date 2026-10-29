// GitHub Pages has no SPA fallback. Copy index.html so that:
// - each page (/projects/, /contact/, ...) is served with status 200 so search engines index it
// - any other unknown path gets 404.html, which loads the app's 404 page
import { copyFileSync, mkdirSync } from 'node:fs'

const routes = ['projects', 'services', 'about', 'skills', 'contact', 'admin']

for (const route of routes) {
  mkdirSync(`dist/${route}`, { recursive: true })
  copyFileSync('dist/index.html', `dist/${route}/index.html`)
}
copyFileSync('dist/index.html', 'dist/404.html')
