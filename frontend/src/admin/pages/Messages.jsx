import { useState } from 'react'
import { Mail, Phone, Trash2, Archive, Inbox, Check, MailOpen } from 'lucide-react'
import { api } from '../api'
import { useApiData } from '../useApiData'
import { useSiteStatus } from '../siteStatus'
import { Loading, ErrorNote, PageTitle } from '../components/Status'
import { btn, card } from '../ui'

// "Inbox" is everything except archived messages
const FILTERS = [
  { value: 'inbox', label: 'Inbox', match: (m) => m.status !== 'archived' },
  { value: 'new', label: 'New', match: (m) => m.status === 'new' },
  { value: 'replied', label: 'Replied', match: (m) => m.status === 'replied' },
  { value: 'archived', label: 'Archived', match: (m) => m.status === 'archived' }
]

const STATUS_LABEL = { new: 'New', read: 'Read', replied: 'Replied', archived: 'Archived' }

const SUBJECTS = {
  project: 'Project inquiry',
  consultation: 'Consultation',
  teaching: 'Teaching / mentoring',
  job: 'Job opportunity',
  other: 'Other'
}

const small = 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border-color)] text-sm font-medium text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-colors disabled:opacity-60'

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
  } catch {
    return iso
  }
}

function MessageCard({ message, onChanged }) {
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState(false)

  async function run(request) {
    setBusy(true)
    setError(null)
    try {
      await request()
      onChanged()
    } catch (err) {
      setError(err)
    } finally {
      setBusy(false)
    }
  }

  const setStatus = (status) =>
    run(() => api(`/admin/messages/${message.id}`, { method: 'PUT', body: { status } }))

  function remove() {
    if (!window.confirm(`Delete the message from ${message.name}? This cannot be undone.`)) return
    run(() => api(`/admin/messages/${message.id}`, { method: 'DELETE' }))
  }

  const isNew = message.status === 'new'
  const archived = message.status === 'archived'

  return (
    <article className={`${card} p-5 ${isNew ? 'border-l-4 border-l-[var(--accent-primary)]' : ''}`}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="font-semibold">{message.name}</h2>
          <p className="text-sm text-[var(--text-secondary)]">
            {SUBJECTS[message.subject] || message.subject} · {formatDate(message.createdAt)}
          </p>
        </div>
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${isNew ? 'bg-[var(--accent-soft)] text-[var(--accent-primary)]' : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'}`}>
          {STATUS_LABEL[message.status] || message.status}
        </span>
      </div>

      <p className="mt-3 text-sm whitespace-pre-line">{message.message}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {/* Opening the email app only marks it read; "Mark replied" is your call */}
        <a
          href={`mailto:${message.email}?subject=${encodeURIComponent('Re: your message on amirlearner.me')}`}
          onClick={() => isNew && setStatus('read')}
          className={btn.secondary}
        >
          <Mail size={16} aria-hidden="true" /> Reply to {message.email}
        </a>
        {message.phone && (
          <a href={`tel:${message.phone}`} className={btn.secondary}>
            <Phone size={16} aria-hidden="true" /> {message.phone}
          </a>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {isNew && (
          <button type="button" className={small} disabled={busy} onClick={() => setStatus('read')}>
            <MailOpen size={14} aria-hidden="true" /> Mark read
          </button>
        )}
        {message.status !== 'replied' && !archived && (
          <button type="button" className={small} disabled={busy} onClick={() => setStatus('replied')}>
            <Check size={14} aria-hidden="true" /> Mark replied
          </button>
        )}
        {archived ? (
          <button type="button" className={small} disabled={busy} onClick={() => setStatus('read')}>
            <Inbox size={14} aria-hidden="true" /> Move to inbox
          </button>
        ) : (
          <button type="button" className={small} disabled={busy} onClick={() => setStatus('archived')}>
            <Archive size={14} aria-hidden="true" /> Archive
          </button>
        )}
        <button type="button" onClick={remove} disabled={busy} className={`${small} ml-auto !text-[var(--error)] hover:!border-[var(--error)]`}>
          <Trash2 size={14} aria-hidden="true" /> Delete
        </button>
      </div>
      {error && <p role="alert" className="mt-2 text-sm text-[var(--error)]">{error.message}</p>}
    </article>
  )
}

export default function Messages() {
  const [filter, setFilter] = useState('inbox')
  const { data, error, loading, reload } = useApiData('/admin/messages')
  const { refresh } = useSiteStatus()
  const all = data?.items || []
  const active = FILTERS.find((f) => f.value === filter)
  const items = all.filter(active.match)

  function changed() {
    reload()
    refresh() // updates the "new" badge in the menu
  }

  return (
    <>
      <PageTitle>Messages</PageTitle>
      <div role="group" aria-label="Filter messages" className="flex flex-wrap gap-2 mb-5">
        {FILTERS.map((f) => {
          const count = all.filter(f.match).length
          return (
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
              {f.label} <span className="text-[var(--text-muted)]">{count}</span>
            </button>
          )
        })}
      </div>

      <ErrorNote error={error} onRetry={reload} />
      {loading && !data ? <Loading /> : items.length === 0 ? (
        <p className={`${card} p-8 text-center text-[var(--text-secondary)]`}>
          {filter === 'inbox' ? 'No messages. New ones from the contact form show up here.' : 'No messages here.'}
        </p>
      ) : (
        <div className="space-y-4">
          {items.map((m) => <MessageCard key={m.id} message={m} onChanged={changed} />)}
        </div>
      )}
    </>
  )
}
