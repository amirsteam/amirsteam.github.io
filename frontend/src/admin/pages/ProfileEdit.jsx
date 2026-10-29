import { api } from '../api'
import { useApiData } from '../useApiData'
import { profileFields } from '../resources'
import EditForm from '../components/EditForm'
import { Loading, ErrorNote, PageTitle } from '../components/Status'

export default function ProfileEdit() {
  const { data, error, loading, reload } = useApiData('/admin/profile')

  return (
    <>
      <PageTitle>Profile</PageTitle>
      <p className="-mt-3 mb-6 text-sm text-[var(--text-secondary)]">
        Your name, contact details, bio and the stat cards on the About page.
      </p>
      <ErrorNote error={error} onRetry={reload} />
      {loading && !data ? <Loading /> : data && (
        <EditForm
          fields={profileFields}
          item={data.item || {}}
          onSave={(values) => api('/admin/profile', { method: 'PUT', body: values })}
        />
      )}
    </>
  )
}
