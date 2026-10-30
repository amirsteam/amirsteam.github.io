// Unsaved edits: a flag for "the open form has changes", a confirm before leaving,
// and drafts kept in sessionStorage (this browser tab only) so edits survive a
// reload, the Back button or being signed out.

let unsaved = false

export function setUnsaved(value) {
  unsaved = value
}

export function confirmLeave() {
  return !unsaved || window.confirm(
    'You have unsaved changes. Leave this page?\n\nThey are kept as a draft in this tab and come back when you open the item again.'
  )
}

if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', (e) => {
    if (unsaved) e.preventDefault()
  })
}

const PREFIX = 'cmsDraft:'

export function loadDraft(key) {
  if (!key) return null
  try {
    const raw = sessionStorage.getItem(PREFIX + key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveDraft(key, form) {
  if (!key) return
  try { sessionStorage.setItem(PREFIX + key, JSON.stringify(form)) } catch { /* storage full or blocked */ }
}

export function clearDraft(key) {
  if (!key) return
  try { sessionStorage.removeItem(PREFIX + key) } catch { /* ignore */ }
}

export function clearAllDrafts() {
  try {
    Object.keys(sessionStorage).filter((k) => k.startsWith(PREFIX)).forEach((k) => sessionStorage.removeItem(k))
  } catch { /* ignore */ }
}
