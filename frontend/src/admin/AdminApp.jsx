import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import AuthProvider from './AuthProvider'
import { useAuth } from './authContext'
import { usePageMeta } from '../hooks/usePageMeta'
import AdminLayout from './AdminLayout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ResourceList from './pages/ResourceList'
import ResourceEdit from './pages/ResourceEdit'
import ProfileEdit from './pages/ProfileEdit'
import Messages from './pages/Messages'
import Account from './pages/Account'
import { Loading } from './components/Status'

function RequireAdmin({ children }) {
  const { admin, checking } = useAuth()
  const location = useLocation()
  if (checking) return <div className="p-8"><Loading label="Checking your session…" /></div>
  if (!admin) return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  return children
}

// Remount the list when switching content type so old rows never flash
function KeyedList() {
  const { resource } = useParams()
  return <ResourceList key={resource} />
}

export default function AdminApp() {
  usePageMeta({ title: 'CMS | amirlearner.me', noindex: true })

  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<ProfileEdit />} />
          <Route path="messages" element={<Messages />} />
          <Route path="account" element={<Account />} />
          <Route path=":resource" element={<KeyedList />} />
          <Route path=":resource/:id" element={<ResourceEdit />} />
        </Route>
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AuthProvider>
  )
}
