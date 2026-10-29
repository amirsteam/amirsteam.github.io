import { Loader2, AlertCircle } from 'lucide-react'

export function Loading({ label = 'Loading…' }) {
  return (
    <p className="flex items-center gap-2 text-sm text-[var(--text-secondary)] py-8" role="status">
      <Loader2 size={16} className="animate-spin" aria-hidden="true" /> {label}
    </p>
  )
}

export function ErrorNote({ error, onRetry }) {
  if (!error) return null
  return (
    <div role="alert" className="flex flex-wrap items-center gap-3 p-4 rounded-lg border border-[var(--error)] text-sm text-[var(--error)] bg-[var(--bg-primary)]">
      <AlertCircle size={18} aria-hidden="true" />
      <span className="flex-1">{error.message || String(error)}</span>
      {onRetry && <button type="button" onClick={onRetry} className="underline font-medium">Try again</button>}
    </div>
  )
}

export function PageTitle({ children, actions }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      <h1 className="text-2xl font-bold tracking-tight">{children}</h1>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  )
}
