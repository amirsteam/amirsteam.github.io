import { Link } from 'react-router-dom'
import { Inbox, User } from 'lucide-react'
import { useApiData } from '../useApiData'
import { resources } from '../resources'
import { useAuth } from '../authContext'
import PublishButton from '../components/PublishButton'
import { Loading, ErrorNote, PageTitle } from '../components/Status'
import { card } from '../ui'

export default function Dashboard() {
  const { admin } = useAuth()
  const { data, error, loading, reload } = useApiData('/admin/summary')
  const counts = data?.counts || {}

  return (
    <>
      <PageTitle>Welcome back{admin?.name ? `, ${admin.name}` : ''}</PageTitle>

      <section className={`${card} p-5 mb-6`}>
        <h2 className="font-semibold">How changes go live</h2>
        <ol className="mt-2 text-sm text-[var(--text-secondary)] list-decimal pl-5 space-y-1">
          <li>Edit content in the menu on the left and press <strong>Save</strong>. Saved changes are stored right away but are not on the site yet.</li>
          <li>When you're done, press <strong>Publish site</strong>. The site rebuilds and your changes are live in about 2 minutes.</li>
        </ol>
        <div className="mt-4"><PublishButton /></div>
      </section>

      <ErrorNote error={error} onRetry={reload} />
      {loading && !data ? <Loading /> : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Link to="/admin/messages" className={`${card} p-4 flex items-center gap-3 hover:border-[var(--accent-primary)] transition-colors`}>
            <span className="p-2 rounded-lg bg-[var(--accent-soft)] text-[var(--accent-primary)]"><Inbox size={20} aria-hidden="true" /></span>
            <span>
              <span className="block text-sm text-[var(--text-secondary)]">Messages</span>
              <span className="block font-semibold">{counts.newMessages ?? 0} new · {counts.messages ?? 0} total</span>
            </span>
          </Link>
          <Link to="/admin/profile" className={`${card} p-4 flex items-center gap-3 hover:border-[var(--accent-primary)] transition-colors`}>
            <span className="p-2 rounded-lg bg-[var(--accent-soft)] text-[var(--accent-primary)]"><User size={20} aria-hidden="true" /></span>
            <span>
              <span className="block text-sm text-[var(--text-secondary)]">Profile</span>
              <span className="block font-semibold">Name, bio, contact, stats</span>
            </span>
          </Link>
          {Object.entries(resources).map(([key, r]) => (
            <Link key={key} to={`/admin/${key}`} className={`${card} p-4 flex items-center gap-3 hover:border-[var(--accent-primary)] transition-colors`}>
              <span className="p-2 rounded-lg bg-[var(--accent-soft)] text-[var(--accent-primary)]"><r.icon size={20} aria-hidden="true" /></span>
              <span>
                <span className="block text-sm text-[var(--text-secondary)]">{r.label}</span>
                <span className="block font-semibold">{counts[key] ?? 0} items</span>
              </span>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
