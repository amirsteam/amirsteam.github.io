// Build step (after fetch-content): for every CMS project that has a live URL but
// no screenshot path, open the live site in Chrome, save a 960×540 screenshot to
// public/projects/auto/<slug>.webp and point the project's thumbnail at it.
//
// Uses the Chrome already installed on GitHub's runners (or CHROME_PATH locally).
// A site that fails to load is skipped with a warning; it never stops the deploy.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import puppeteer from 'puppeteer-core'

const CMS = new URL('../src/data/cms.json', import.meta.url)
const OUT_DIR = new URL('../public/projects/auto/', import.meta.url)

const chromePaths = [
  process.env.CHROME_PATH,
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium-browser',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
].filter(Boolean)

const isWebUrl = (value) => {
  try {
    return ['http:', 'https:'].includes(new URL(value).protocol)
  } catch {
    return false
  }
}

async function main() {
  const content = JSON.parse(readFileSync(CMS, 'utf8'))
  const todo = (content.projects || []).filter(
    (p) => !p.thumbnail && isWebUrl(p.liveUrl) && /^[a-z0-9-]+$/.test(p.slug || '')
  )
  if (!todo.length) {
    console.log('No projects need an automatic screenshot')
    return
  }

  const executablePath = chromePaths.find((p) => existsSync(p))
  if (!executablePath) {
    console.warn('Chrome not found (set CHROME_PATH): skipping automatic screenshots')
    return
  }

  mkdirSync(OUT_DIR, { recursive: true })
  const browser = await puppeteer.launch({ executablePath, args: ['--no-sandbox', '--hide-scrollbars'] })
  try {
    for (const project of todo) {
      const page = await browser.newPage()
      try {
        // 1280×720 layout, saved at 960×540 like the hand-made screenshots
        await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 0.75 })
        await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
        await page.goto(project.liveUrl, { waitUntil: 'networkidle2', timeout: 45000 })
        // Let fonts, images and entrance animations settle
        await new Promise((r) => setTimeout(r, 2500))
        await page.screenshot({
          path: new URL(`${project.slug}.webp`, OUT_DIR),
          type: 'webp',
          quality: 80
        })
        project.thumbnail = `/projects/auto/${project.slug}.webp`
        console.log(`Screenshot saved for "${project.title}" (${project.liveUrl})`)
      } catch (err) {
        console.warn(`Could not screenshot "${project.title}" (${project.liveUrl}): ${err.message}`)
      } finally {
        await page.close()
      }
    }
  } finally {
    await browser.close()
  }

  writeFileSync(CMS, JSON.stringify(content, null, 2) + '\n')
}

main().catch((err) => {
  // Screenshots are a nice-to-have: report and carry on with the build
  console.warn(`Automatic screenshots skipped: ${err.message}`)
})
