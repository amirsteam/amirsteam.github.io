import { useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { Plus, Pencil, ArrowUp, ArrowDown } from 'lucide-react'
import { resources } from '../resources'
import { api } from '../api'
import { useApiData } from '../useApiData'
import { useSiteStatus } from '../siteStatus'
import { Loading, ErrorNote, PageTitle } from '../components/Status'
import { btn, card } from '../ui'

function cell(value) {
  if (value === undefined || value === null || value === '') return '—'
  return String(value)
}

// Column header: the field's short name, or its label without "(…)"
function columnLabel(field, name) {
  if (!field) return name
  return field.short || field.label.replace(/\s*\(.*?\)\s*/g, '').trim()
}

// On/off switch used for "Shown", "Featured" and similar yes/no fields
function Toggle({ checked, onChange, label, onText, offText, busy }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      aria-busy={busy || undefined}
      className="inline-flex items-center gap-2 rounded-full"
    >
      <span className={`relative inline-block w-9 h-5 rounded-full transition-colors ${checked ? 'bg-[var(--accent-primary)]' : 'bg-[var(--border-color)]'}`} aria-hidden="true">
        <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${checked ? 'translate-x-4' : ''}`} />
      </span>
      <span className={checked ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}>{checked ? onText : offText}</span>
    </button>
  )
}

const iconBtn = 'p-1.5 rounded-md text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--accent-primary)] disabled:opacity-30 disabled:hover:bg-transparent'

export default function ResourceList() {
  const { resource } = useParams()
  const config = resources[resource]
  const { data, error, loading, reload } = useApiData(`/admin/${resource}`)
  const { refresh } = useSiteStatus()
  const [busy, setBusy] = useState(false)
  const [actionError, setActionError] = useState(null)
  if (!config) return <Navigate to="/admin" replace />

  const items = data?.items || []
  const fieldByName = Object.fromEntries(config.fields.map((f) => [f.name, f]))
  const title = (item) => item[config.titleField] || config.singular

  async function run(request) {
    if (busy) return // one change at a time; buttons stay focusable for keyboard users
    setBusy(true)
    setActionError(null)
    try {
      await request()
      reload()
      refresh()
    } catch (err) {
      setActionError(err)
    } finally {
      setBusy(false)
    }
  }

  const toggle = (item, name) =>
    run(() => api(`/admin/${resource}/${item.id}`, { method: 'PUT', body: { [name]: !item[name] } }))

  const move = (index, step) => {
    const ids = items.map((i) => i.id)
    ;[ids[index], ids[index + step]] = [ids[index + step], ids[index]]
    return run(() => api(`/admin/${resource}/reorder`, { method: 'PUT', body: { ids } }))
  }


  return (
    <>
      <PageTitle actions={
        <Link to={`/admin/${resource}/new`} className={btn.primary}>
          <Plus size={16} aria-hidden="true" /> Add {config.singular}
        </Link>
      }>
        {config.label}
      </PageTitle>

      <ErrorNote error={error || actionError} onRetry={error ? reload : undefined} />
      {loading && !data ? <Loading /> : items.length === 0 ? (
        <div className={`${card} p-8 text-center text-[var(--text-secondary)]`}>
          Nothing here yet. <Link to={`/admin/${resource}/new`} className="text-[var(--accent-primary)] underline">Add the first {config.singular}</Link>.
        </div>
      ) : (
        <div className={`${card} overflow-x-auto mt-4`}>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[var(--text-secondary)] border-b border-[var(--border-color)]">
                <th scope="col" className="pl-3 pr-1 py-3 font-medium w-px">Order</th>
                {config.columns.map((c) => (
                  <th key={c} scope="col" className="px-4 py-3 font-medium whitespace-nowrap">{columnLabel(fieldByName[c], c)}</th>
                ))}
                <th scope="col" className="px-4 py-3 font-medium">On site</th>
                <th scope="col" className="px-4 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.id} className="border-b last:border-0 border-[var(--border-color)]">
                  <td className="pl-3 pr-1 py-2 whitespace-nowrap">
                    <button type="button" className={iconBtn} onClick={() => move(index, -1)} disabled={index === 0} aria-label={`Move "${title(item)}" up`}>
                      <ArrowUp size={16} aria-hidden="true" />
                    </button>
                    <button type="button" className={iconBtn} onClick={() => move(index, 1)} disabled={index === items.length - 1} aria-label={`Move "${title(item)}" down`}>
                      <ArrowDown size={16} aria-hidden="true" />
                    </button>
                  </td>
                  {config.columns.map((c, i) => (
                    <td key={c} className={`px-4 py-3 ${i === 0 ? 'font-medium' : 'text-[var(--text-secondary)]'}`}>
                      {fieldByName[c]?.type === 'checkbox' ? (
                        <Toggle
                          checked={Boolean(item[c])}
                          onChange={() => toggle(item, c)}
                          busy={busy}
                          label={`${columnLabel(fieldByName[c], c)}: ${title(item)}`}
                          onText="Yes"
                          offText="No"
                        />
                      ) : cell(item[c])}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <Toggle
                      checked={Boolean(item.isPublished)}
                      onChange={() => toggle(item, 'isPublished')}
                      busy={busy}
                      label={`Show "${title(item)}" on the site`}
                      onText="Shown"
                      offText="Draft"
                    />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link to={`/admin/${resource}/${item.id}`} className="inline-flex items-center gap-1 text-[var(--accent-primary)] font-medium hover:underline">
                      <Pencil size={14} aria-hidden="true" /> Edit<span className="sr-only"> {title(item)}</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {items.length > 0 && (
        <p className="mt-3 text-xs text-[var(--text-muted)]">
          Changes here are saved straight away. Press Publish site to put them live.
        </p>
      )}
    </>
  )
}
