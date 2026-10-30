import { Link } from 'react-router-dom'
import { Inbox, User } from 'lucide-react'
import { resources } from '../resources'
import { useAuth } from '../authContext'
import { useSiteStatus } from '../siteStatus'
import PublishButton from '../components/PublishButton'
import PublishStatus from '../components/PublishStatus'
import { Loading, ErrorNote, PageTitle } from '../components/Status'
import { card } from '../ui'

const tile = `${card} p-4 flex items-center gap-3 hover:border-[var(--accent-primary)] transition-colors`
const iconBox = 'p-2 rounded-lg bg-[var(--accent-soft)] text-[var(--accent-primary)]'

export default function Dashboard() {
  const { admin } = useAuth()
  const { summary, error, loading, refresh } = useSiteStatus()
  const counts = summary?.counts || {}

  return (
    <>
      <PageTitle>Welcome back{admin?.name ? `, ${admin.name}` : ''}</PageTitle>

      <section className={`${card} p-5 mb-6`} aria-labelledby="site-status">
        <h2 id="site-status" className="font-semibold mb-3">Live site</h2>
        {summary ? <PublishStatus /> : null}
        <div className="mt-4"><PublishButton /></div>
        <details className="mt-4 text-sm text-[var(--text-secondary)]">
          <summary className="cursor-pointer font-medium text-[var(--text-primary)]">How changes go live</summary>
          <ol className="mt-2 list-decimal pl-5 space-y-1">
            <li>Edit content in the menu and press <strong>Save</strong>. Saved changes are stored right away but are not on the site yet.</li>
            <li>Press <strong>Publish site</strong>. The site rebuilds and your changes are live in about 2 minutes.</li>
          </ol>
        </details>
      </section>

      <ErrorNote error={error} onRetry={refresh} />
      {loading && !summary ? <Loading /> : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Link to="/admin/messages" className={tile}>
            <span className={iconBox}><Inbox size={20} aria-hidden="true" /></span>
            <span>
              <span className="block text-sm text-[var(--text-secondary)]">Messages</span>
              <span className="block font-semibold">{counts.newMessages ?? 0} new · {counts.messages ?? 0} total</span>
            </span>
          </Link>
          <Link to="/admin/profile" className={tile}>
            <span className={iconBox}><User size={20} aria-hidden="true" /></span>
            <span>
              <span className="block text-sm text-[var(--text-secondary)]">Profile</span>
              <span className="block font-semibold">Name, bio, contact, stats</span>
            </span>
          </Link>
          {Object.entries(resources).map(([key, r]) => (
            <Link key={key} to={`/admin/${key}`} className={tile}>
              <span className={iconBox}><r.icon size={20} aria-hidden="true" /></span>
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
