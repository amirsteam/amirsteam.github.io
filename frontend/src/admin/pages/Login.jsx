import { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useAuth } from '../authContext'
import { btn, input, card } from '../ui'

export default function Login() {
  const { admin, login } = useAuth()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  if (admin) return <Navigate to={location.state?.from || '/admin'} replace />

  async function submit(e) {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      await login(email, password)
    } catch (err) {
      setError(err.message)
      setBusy(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-[var(--bg-secondary)] text-[var(--text-primary)]">
      <div className={`${card} w-full max-w-sm p-6 sm:p-8`}>
        <p className="text-xl font-bold tracking-tight">Amir<span className="text-[var(--accent-primary)]">.</span> CMS</p>
        <h1 className="mt-6 text-lg font-semibold">Sign in</h1>
        <form onSubmit={submit} className="mt-4 space-y-4" noValidate>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1.5">Email</label>
            <input id="email" type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} className={input} />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1.5">Password</label>
            <input id="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className={input} />
          </div>
          {error && <p role="alert" className="text-sm text-[var(--error)]">{error}</p>}
          <button type="submit" disabled={busy || !email || !password} className={`${btn.primary} w-full`}>
            {busy && <Loader2 size={16} className="animate-spin" aria-hidden="true" />}
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <p className="mt-6 text-xs text-[var(--text-muted)]">
          The server may take up to a minute to wake up on the first sign-in of the day.
        </p>
      </div>
    </main>
  )
}
