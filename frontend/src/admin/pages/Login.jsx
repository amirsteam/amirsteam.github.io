import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useAuth } from '../authContext'
import { ping } from '../api'
import { btn, input, card } from '../ui'

export default function Login() {
  const { admin, login } = useAuth()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  // checking -> slow (still waking after a moment) -> ready | down
  const [server, setServer] = useState('checking')

  // Wake the free server as soon as the page opens, so sign-in is quick
  useEffect(() => {
    let done = false
    const slow = setTimeout(() => { if (!done) setServer('slow') }, 1500)
    ping().then((ok) => {
      done = true
      clearTimeout(slow)
      setServer(ok ? 'ready' : 'down')
    })
    return () => { done = true; clearTimeout(slow) }
  }, [])

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
        <p role="status" className="mt-6 flex items-start gap-2 text-xs text-[var(--text-muted)]">
          {server === 'slow' && <Loader2 size={14} className="animate-spin shrink-0" aria-hidden="true" />}
          <span>
            {server === 'slow' && 'Waking the server. The first visit of the day can take up to a minute; you can sign in now and it will go through once it is awake.'}
            {server === 'ready' && 'Server is awake.'}
            {server === 'down' && "Can't reach the server right now. Check your connection, or try again in a minute."}
          </span>
        </p>
      </div>
    </main>
  )
}
