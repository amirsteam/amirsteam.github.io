// Build step: download the published CMS content and save it as
// src/data/cms.json, which src/data/index.js merges over the defaults.
//
//   CONTENT_API_URL=https://your-api.onrender.com/api node scripts/fetch-content.js
//
// Without CONTENT_API_URL it does nothing (the site uses defaults.js).
// If the API can't be reached it exits with an error, so a failed fetch never
// replaces the live site with old content.
import { writeFileSync } from 'node:fs'

const base = (process.env.CONTENT_API_URL || '').replace(/\/+$/, '')
const OUT = new URL('../src/data/cms.json', import.meta.url)

// Render's free plan sleeps; the first request can take up to a minute
const ATTEMPTS = 6
const WAIT_MS = 15000

async function fetchContent() {
  let lastError
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    try {
      const res = await fetch(`${base}/content`, { signal: AbortSignal.timeout(60000) })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return await res.json()
    } catch (err) {
      lastError = err
      console.log(`Attempt ${attempt}/${ATTEMPTS} failed (${err.message}); the API may be waking up…`)
      if (attempt < ATTEMPTS) await new Promise((r) => setTimeout(r, WAIT_MS))
    }
  }
  throw lastError
}

async function main() {
  if (!base) {
    console.log('CONTENT_API_URL not set: building with the built-in content')
    return
  }
  const content = await fetchContent()
  if (!content || typeof content !== 'object' || !Array.isArray(content.projects)) {
    throw new Error('Unexpected response from /content')
  }
  writeFileSync(OUT, JSON.stringify(content, null, 2) + '\n')
  const counts = ['projects', 'services', 'skills', 'experience', 'education', 'testimonials']
    .map((k) => `${k}: ${(content[k] || []).length}`).join(', ')
  console.log(`Saved CMS content (${counts})`)
}

main().catch((err) => {
  console.error(`Could not load CMS content from ${base}: ${err.message}`)
  process.exit(1)
})
