// The site has no backend: all content lives in src/data/index.js.
// The only network call is the contact form, which emails you through Web3Forms.

// Public Web3Forms access key (safe to ship in the browser; it only allows
// sending email to the address it was created for). Set in
// .github/workflows/deploy-frontend.yml, or in .env for local development.
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || ''

const SUBJECT_LABELS = {
  project: 'Project Inquiry',
  consultation: 'Consultation',
  teaching: 'Teaching/Mentoring',
  job: 'Job Opportunity',
  other: 'Other'
}

/**
 * Send a contact form message.
 * Always resolves to { success, error } and never throws.
 * Without a Web3Forms key it fails right away, and the form offers
 * email and WhatsApp instead.
 */
async function submitContact({ name, email, phone, subject, message }) {
  if (!WEB3FORMS_KEY) {
    return { success: false, error: 'Contact form is not configured (VITE_WEB3FORMS_KEY missing)' }
  }

  try {
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
    if (response.ok && json.success) {
      return { success: true, error: null }
    }
    console.warn('Web3Forms rejected the message:', json.message || response.status)
    return { success: false, error: json.message || `HTTP ${response.status}` }
  } catch (error) {
    console.warn('Web3Forms request failed:', error.message)
    return { success: false, error: error.message }
  }
}

export const api = { submitContact }

export default api
