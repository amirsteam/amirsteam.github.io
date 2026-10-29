import { useState } from 'react'
import { Mail, Phone, Trash2 } from 'lucide-react'
import { api } from '../api'
import { useApiData } from '../useApiData'
import { Loading, ErrorNote, PageTitle } from '../components/Status'
import { btn, card, input } from '../ui'

const FILTERS = [
  { value: '', label: 'All' },
  { value: 'new', label: 'New' },
  { value: 'read', label: 'Read' },
  { value: 'replied', label: 'Replied' },
  { value: 'archived', label: 'Archived' }
]

const SUBJECTS = {
  project: 'Project inquiry',
  consultation: 'Consultation',
  teaching: 'Teaching / mentoring',
  job: 'Job opportunity',
  other: 'Other'
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
  } catch {
    return iso
  }
}

function MessageCard({ message, onChanged }) {
  const [error, setError] = useState(null)

  async function update(changes) {
    try {
      await api(`/admin/messages/${message.id}`, { method: 'PUT', body: changes })
      onChanged()
    } catch (err) {
      setError(err)
    }
  }

  async function remove() {
    if (!window.confirm(`Delete the message from ${message.name}? This cannot be undone.`)) return
    try {
      await api(`/admin/messages/${message.id}`, { method: 'DELETE' })
      onChanged()
    } catch (err) {
      setError(err)
    }
  }

  return (
    <article className={`${card} p-5 ${message.status === 'new' ? 'border-l-4 border-l-[var(--accent-primary)]' : ''}`}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="font-semibold">{message.name}</h2>
          <p className="text-sm text-[var(--text-secondary)]">{SUBJECTS[message.subject] || message.subject} · {formatDate(message.createdAt)}</p>
        </div>
        <label className="text-sm flex items-center gap-2">
          <span className="text-[var(--text-secondary)]">Status</span>
          <select
            value={message.status}
            onChange={(e) => update({ status: e.target.value })}
            className={`${input} !w-auto !py-1.5`}
          >
            {FILTERS.slice(1).map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>
        </label>
      </div>

      <p className="mt-3 text-sm whitespace-pre-line">{message.message}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={`mailto:${message.email}?subject=${encodeURIComponent('Re: your message on amirlearner.me')}`}
          onClick={() => message.status !== 'replied' && update({ status: 'replied' })}
          className={btn.secondary}
        >
          <Mail size={16} aria-hidden="true" /> Reply to {message.email}
        </a>
        {message.phone && (
          <a href={`tel:${message.phone}`} className={btn.secondary}>
            <Phone size={16} aria-hidden="true" /> {message.phone}
          </a>
        )}
        <button type="button" onClick={remove} className={`${btn.danger} ml-auto`}>
          <Trash2 size={16} aria-hidden="true" /> Delete
        </button>
      </div>
      {error && <p role="alert" className="mt-2 text-sm text-[var(--error)]">{error.message}</p>}
    </article>
  )
}

export default function Messages() {
  const [filter, setFilter] = useState('')
  const { data, error, loading, reload } = useApiData(`/admin/messages${filter ? `?status=${filter}` : ''}`)
  const items = data?.items || []

  return (
    <>
      <PageTitle>Messages</PageTitle>
      <div role="group" aria-label="Filter messages" className="flex flex-wrap gap-2 mb-5">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            aria-pressed={filter === f.value}
            className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
              filter === f.value
                ? 'bg-[var(--accent-soft)] border-[var(--accent-primary)] text-[var(--accent-primary)]'
                : 'border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <ErrorNote error={error} onRetry={reload} />
      {loading && !data ? <Loading /> : items.length === 0 ? (
        <p className={`${card} p-8 text-center text-[var(--text-secondary)]`}>No messages here.</p>
      ) : (
        <div className="space-y-4">
          {items.map((m) => <MessageCard key={m.id} message={m} onChanged={reload} />)}
        </div>
      )}
    </>
  )
}
