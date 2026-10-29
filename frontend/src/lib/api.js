// The only network call on the public site is the contact form.
// Messages go two ways when both are set up:
//   - Web3Forms emails them to you (fast, always on)
//   - the CMS API saves them in the admin inbox (/admin/messages)

// Public Web3Forms access key (safe in the browser: it can only email you)
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || ''
// CMS API, e.g. https://amirlearner-api.onrender.com/api
const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '')

const SUBJECT_LABELS = {
  project: 'Project Inquiry',
  consultation: 'Consultation',
  teaching: 'Teaching/Mentoring',
  job: 'Job Opportunity',
  other: 'Other'
}

async function sendToWeb3Forms({ name, email, phone, subject, message }) {
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      subject: `[Portfolio] ${SUBJECT_LABELS[subject] || 'Message'} from ${name}`,
      from_name: 'amirlearner.me',
      name,
      email,
      phone: phone || '-',
      topic: SUBJECT_LABELS[subject] || subject,
      message
    })
  })
  const json = await response.json().catch(() => ({}))
  if (!response.ok || !json.success) throw new Error(json.message || `HTTP ${response.status}`)
}

async function sendToInbox(data, timeoutMs) {
  const response = await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    keepalive: true,
    signal: AbortSignal.timeout(timeoutMs)
  })
  if (!response.ok) {
    const json = await response.json().catch(() => ({}))
    throw new Error(json.error || `HTTP ${response.status}`)
  }
}

/**
 * Send a contact form message. Resolves to { success, error }; never throws.
 */
async function submitContact(data) {
  if (!WEB3FORMS_KEY && !API_URL) {
    return { success: false, error: 'Contact form is not configured' }
  }

  try {
    if (WEB3FORMS_KEY) {
      // Email is the main channel; the inbox copy is a bonus that may be
      // slow while the free server wakes up, so don't make visitors wait
      await sendToWeb3Forms(data)
      if (API_URL) sendToInbox(data, 60000).catch(() => {})
    } else {
      // Inbox only: allow time for the server to wake up
      await sendToInbox(data, 60000)
    }
    return { success: true, error: null }
  } catch (error) {
    console.warn('Contact form failed:', error.message)
    return { success: false, error: error.message }
  }
}

export const api = { submitContact }

export default api
