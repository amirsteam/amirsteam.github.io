import { Link, useParams, Navigate } from 'react-router-dom'
import { Plus, Pencil } from 'lucide-react'
import { resources } from '../resources'
import { useApiData } from '../useApiData'
import { Loading, ErrorNote, PageTitle } from '../components/Status'
import { btn, card } from '../ui'

function cell(value) {
  if (typeof value === 'boolean') return value ? 'Yes' : '—'
  if (value === undefined || value === null || value === '') return '—'
  return String(value)
}

export default function ResourceList() {
  const { resource } = useParams()
  const config = resources[resource]
  const { data, error, loading, reload } = useApiData(`/admin/${resource}`)
  if (!config) return <Navigate to="/admin" replace />

  const items = data?.items || []
  const columns = config.columns

  return (
    <>
      <PageTitle actions={
        <Link to={`/admin/${resource}/new`} className={btn.primary}>
          <Plus size={16} aria-hidden="true" /> Add {config.singular}
        </Link>
      }>
        {config.label}
      </PageTitle>

      <ErrorNote error={error} onRetry={reload} />
      {loading && !data ? <Loading /> : items.length === 0 ? (
        <div className={`${card} p-8 text-center text-[var(--text-secondary)]`}>
          Nothing here yet. <Link to={`/admin/${resource}/new`} className="text-[var(--accent-primary)] underline">Add the first {config.singular}</Link>.
        </div>
      ) : (
        <div className={`${card} overflow-x-auto`}>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[var(--text-secondary)] border-b border-[var(--border-color)]">
                {columns.map((c) => (
                  <th key={c} scope="col" className="px-4 py-3 font-medium capitalize">{c}</th>
                ))}
                <th scope="col" className="px-4 py-3 font-medium">Status</th>
                <th scope="col" className="px-4 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b last:border-0 border-[var(--border-color)]">
                  {columns.map((c, i) => (
                    <td key={c} className={`px-4 py-3 ${i === 0 ? 'font-medium' : 'text-[var(--text-secondary)]'}`}>{cell(item[c])}</td>
                  ))}
                  <td className="px-4 py-3">
                    {item.isPublished
                      ? <span className="text-[var(--success)]">Shown</span>
                      : <span className="text-[var(--text-muted)]">Draft</span>}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link to={`/admin/${resource}/${item.id}`} className="inline-flex items-center gap-1 text-[var(--accent-primary)] font-medium hover:underline">
                      <Pencil size={14} aria-hidden="true" /> Edit<span className="sr-only"> {item[config.titleField]}</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
