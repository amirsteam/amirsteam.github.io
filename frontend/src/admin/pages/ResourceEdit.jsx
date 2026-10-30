import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Trash2 } from 'lucide-react'
import { resources } from '../resources'
import { api } from '../api'
import { useApiData } from '../useApiData'
import { useSiteStatus } from '../siteStatus'
import EditForm from '../components/EditForm'
import { Loading, ErrorNote, PageTitle } from '../components/Status'
import { btn } from '../ui'

function Editor({ resource, config, item }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { refresh } = useSiteStatus()
  const [deleteError, setDeleteError] = useState(null)
  const isNew = !item

  async function save(values) {
    if (isNew) {
      const data = await api(`/admin/${resource}`, { method: 'POST', body: values })
      refresh()
      navigate(`/admin/${resource}/${data.item.id}`, { replace: true, state: { created: true } })
    } else {
      await api(`/admin/${resource}/${item.id}`, { method: 'PUT', body: values })
      refresh()
    }
  }

  async function remove() {
    const name = item[config.titleField] || `this ${config.singular}`
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return
    try {
      await api(`/admin/${resource}/${item.id}`, { method: 'DELETE' })
      refresh()
      navigate(`/admin/${resource}`, { replace: true })
    } catch (err) {
      setDeleteError(err)
    }
  }

  return (
    <>
      <PageTitle>{isNew ? `Add ${config.singular}` : `Edit ${config.singular}`}</PageTitle>
      <ErrorNote error={deleteError} />
      <EditForm
        // A new key after creating swaps in the saved item cleanly
        key={item?.id || 'new'}
        fields={config.fields}
        item={item}
        draftKey={`${resource}:${item?.id || 'new'}`}
        onSave={save}
        initialMessage={location.state?.created ? `Created. Press "Publish site" when you want it live.` : ''}
        extraActions={!isNew && (
          <button type="button" onClick={remove} className={`${btn.danger} mt-4 ml-auto`}>
            <Trash2 size={16} aria-hidden="true" /> Delete
          </button>
        )}
      />
    </>
  )
}

function ExistingItem({ resource, config, id }) {
  const { data, error, loading, reload } = useApiData(`/admin/${resource}/${id}`)
  if (loading && !data) return <Loading />
  if (error) return <ErrorNote error={error} onRetry={reload} />
  return <Editor resource={resource} config={config} item={data.item} />
}

export default function ResourceEdit() {
  const { resource, id } = useParams()
  const config = resources[resource]
  if (!config) return <Navigate to="/admin" replace />

  return (
    <>
      <Link to={`/admin/${resource}`} className="inline-flex items-center gap-1 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] mb-4">
        <ArrowLeft size={14} aria-hidden="true" /> All {config.label.toLowerCase()}
      </Link>
      {id === 'new'
        ? <Editor resource={resource} config={config} item={null} />
        : <ExistingItem key={id} resource={resource} config={config} id={id} />}
    </>
  )
}
