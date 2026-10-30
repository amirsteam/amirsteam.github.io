// Talks to the CMS API (backend/). The sign-in token lives in sessionStorage,
// so it is cleared when the browser closes.
export const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/+$/, '')

const TOKEN_KEY = 'cmsToken'

export function getToken() {
  try { return sessionStorage.getItem(TOKEN_KEY) || '' } catch { return '' }
}

export function setToken(token) {
  try {
    if (token) sessionStorage.setItem(TOKEN_KEY, token)
    else sessionStorage.removeItem(TOKEN_KEY)
  } catch { /* storage blocked: stay signed in for this page only */ }
}

export class ApiError extends Error {
  constructor(message, status, fields) {
    super(message)
    this.status = status
    this.fields = fields || {}
  }
}

// Called when the server says the session is no longer valid
let onUnauthorized = () => {}
export function setUnauthorizedHandler(fn) { onUnauthorized = fn }

const TIMEOUT_MS = 90000
const WAKE_MESSAGE = 'Cannot reach the server. It may be waking up (Render free plan): try again in 30 seconds.'

function send(path, method, body) {
  return fetch(`${API_URL}${path}`, {
    method,
    headers: {
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {})
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    // A sleeping server can take up to a minute; give up after 90 seconds
    signal: AbortSignal.timeout(TIMEOUT_MS)
  })
}

export async function api(path, { method = 'GET', body } = {}) {
  let response
  try {
    response = await send(path, method, body)
  } catch {
    // Reads are safe to repeat once; changes are not retried automatically
    if (method !== 'GET') throw new ApiError(WAKE_MESSAGE, 0)
    try {
      await new Promise((r) => setTimeout(r, 3000))
      response = await send(path, method, body)
    } catch {
      throw new ApiError(WAKE_MESSAGE, 0)
    }
  }

  if (response.status === 204) return null
  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    if (response.status === 401 && path !== '/auth/login') onUnauthorized()
    throw new ApiError(data.error || `Request failed (${response.status})`, response.status, data.fields)
  }
  return data
}

// Is the server awake? Resolves true/false; used by the sign-in page
export async function ping() {
  try {
    const res = await fetch(`${API_URL}/health`, { signal: AbortSignal.timeout(TIMEOUT_MS) })
    return res.ok
  } catch {
    return false
  }
}
