import { useState } from 'react'
import { Rocket, Loader2 } from 'lucide-react'
import { api } from '../api'
import { btn } from '../ui'

// Rebuilds the public site from the saved content (takes about 2 minutes)
export default function PublishButton({ compact = false }) {
  const [state, setState] = useState({ status: 'idle', message: '', link: '' })

  async function publish() {
    setState({ status: 'busy', message: '', link: '' })
    try {
      const data = await api('/admin/publish', { method: 'POST' })
      setState({
        status: 'done',
        message: 'Publishing started. Your changes will be live in about 2 minutes.',
        link: data.actionsUrl
      })
    } catch (err) {
      setState({ status: 'error', message: err.message, link: '' })
    }
  }

  return (
    <div className={compact ? 'relative' : 'space-y-2'}>
      <button type="button" onClick={publish} disabled={state.status === 'busy'} className={btn.primary}>
        {state.status === 'busy'
          ? <Loader2 size={16} className="animate-spin" aria-hidden="true" />
          : <Rocket size={16} aria-hidden="true" />}
        Publish site
      </button>
      {/* In the top bar the message floats below the button instead of stretching the header */}
      <div
        aria-live="polite"
        className={compact && state.status !== 'idle' && state.status !== 'busy'
          ? 'absolute right-0 top-full mt-2 w-72 p-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] shadow-sm text-sm z-40'
          : 'text-sm'}
      >
        {state.status === 'done' && (
          <p className={`text-[var(--success)] ${compact ? '' : 'mt-2'}`}>
            {state.message}{' '}
            {state.link && <a href={state.link} target="_blank" rel="noopener noreferrer" className="underline">Watch progress</a>}
          </p>
        )}
        {state.status === 'error' && <p className={`text-[var(--error)] ${compact ? '' : 'mt-2'}`}>{state.message}</p>}
      </div>
    </div>
  )
}
