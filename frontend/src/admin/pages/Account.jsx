import { api } from '../api'
import EditForm from '../components/EditForm'
import { PageTitle } from '../components/Status'

const fields = [
  { name: 'currentPassword', label: 'Current password', type: 'password', required: true },
  { name: 'newPassword', label: 'New password', type: 'password', required: true, help: 'At least 10 characters.' }
]

export default function Account() {
  return (
    <>
      <PageTitle>Change password</PageTitle>
      <EditForm
        fields={fields}
        item={{}}
        successMessage="Password changed."
        onSave={(values) => api('/auth/password', { method: 'PUT', body: values })}
      />
    </>
  )
}
