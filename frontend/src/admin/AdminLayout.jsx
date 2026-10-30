import { useState } from 'react'
import { NavLink, Outlet, Link } from 'react-router-dom'
import { LayoutDashboard, User, Inbox, KeyRound, LogOut, Menu, X, ExternalLink } from 'lucide-react'
import { useAuth } from './authContext'
import { resources } from './resources'
import PublishButton from './components/PublishButton'
import { useSiteStatus } from './siteStatus'
import { clearAllDrafts, confirmLeave } from './unsaved'

const navClass = ({ isActive }) =>
  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
    isActive
      ? 'bg-[var(--accent-soft)] text-[var(--accent-primary)]'
      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]'
  }`

export default function AdminLayout() {
  const { admin, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  const { summary } = useSiteStatus()
  const newMessages = summary?.counts?.newMessages || 0

  // Ask before any in-app link leaves a form with unsaved changes
  function guardLinks(e) {
    const link = e.target.closest('a[href]')
    if (!link || link.target === '_blank' || /^(mailto|tel):/.test(link.getAttribute('href'))) return
    if (!confirmLeave()) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  function signOut() {
    if (!confirmLeave()) return
    clearAllDrafts()
    logout()
  }

  const nav = (
    <nav aria-label="Admin" className="flex flex-col gap-1">
      <NavLink to="/admin" end className={navClass} onClick={close}>
        <LayoutDashboard size={18} aria-hidden="true" /> Dashboard
      </NavLink>
      <p className="mt-4 mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Content</p>
      <NavLink to="/admin/profile" className={navClass} onClick={close}>
        <User size={18} aria-hidden="true" /> Profile
      </NavLink>
      {Object.entries(resources).map(([key, r]) => (
        <NavLink key={key} to={`/admin/${key}`} className={navClass} onClick={close}>
          <r.icon size={18} aria-hidden="true" /> {r.label}
        </NavLink>
      ))}
      <p className="mt-4 mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Other</p>
      <NavLink to="/admin/messages" className={navClass} onClick={close}>
        <Inbox size={18} aria-hidden="true" /> Messages
        {newMessages > 0 && (
          <span className="ml-auto min-w-5 px-1.5 py-0.5 rounded-full bg-[var(--accent-primary)] text-[var(--accent-contrast)] text-xs font-semibold text-center">
            {newMessages}<span className="sr-only"> new</span>
          </span>
        )}
      </NavLink>
      <NavLink to="/admin/account" className={navClass} onClick={close}>
        <KeyRound size={18} aria-hidden="true" /> Password
      </NavLink>
    </nav>
  )

  return (
    <div className="min-h-screen bg-[var(--bg-secondary)] text-[var(--text-primary)]" onClickCapture={guardLinks}>
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-[var(--bg-primary)] border-b border-[var(--border-color)]">
        <div className="flex items-center justify-between gap-3 h-14 px-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-[var(--bg-secondary)]"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link to="/admin" className="font-bold tracking-tight">
              Amir<span className="text-[var(--accent-primary)]">.</span> <span className="font-medium text-[var(--text-secondary)]">CMS</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <a href="/" target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)]">
              View site <ExternalLink size={14} aria-hidden="true" />
            </a>
            <div className="hidden md:block"><PublishButton compact /></div>
            <button type="button" onClick={signOut} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]" title={admin?.email}>
              <LogOut size={16} aria-hidden="true" /> <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar: fixed on large screens, drawer on small */}
        <aside className={`${open ? 'block' : 'hidden'} lg:block fixed lg:sticky top-14 z-20 h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto bg-[var(--bg-primary)] border-r border-[var(--border-color)] p-4`}>
          {nav}
          <div className="md:hidden mt-6"><PublishButton /></div>
        </aside>
        {open && <button type="button" aria-label="Close menu" className="lg:hidden fixed inset-0 top-14 z-10 bg-black/30" onClick={close} />}

        <main id="admin-main" className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          <div className="max-w-4xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
