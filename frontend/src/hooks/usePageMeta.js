import { useEffect } from 'react'

const SITE_URL = 'https://www.amirlearner.me'

function setTag(selector, create, attr, value) {
  if (value === undefined) return
  let el = document.head.querySelector(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

/**
 * Sets the page title, description, canonical URL and robots tag.
 * Updates the tags already in index.html instead of adding duplicates.
 * (react-helmet-async does not work with React 19, so it was replaced by this.)
 */
export function usePageMeta({ title, description, path, noindex = false }) {
  useEffect(() => {
    if (title) document.title = title

    setTag('meta[name="description"]', () => {
      const m = document.createElement('meta')
      m.setAttribute('name', 'description')
      return m
    }, 'content', description)

    // Pages that shouldn't be indexed (like 404) get no canonical link
    if (noindex) document.head.querySelector('link[rel="canonical"]')?.remove()

    setTag('link[rel="canonical"]', () => {
      const l = document.createElement('link')
      l.setAttribute('rel', 'canonical')
      return l
    }, 'href', path === undefined ? undefined : `${SITE_URL}${path}`)

    setTag('meta[name="robots"]', () => {
      const m = document.createElement('meta')
      m.setAttribute('name', 'robots')
      return m
    }, 'content', noindex ? 'noindex' : 'index, follow')
  }, [title, description, path, noindex])
}
