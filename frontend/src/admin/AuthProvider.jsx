import { useCallback, useEffect, useMemo, useState } from 'react'
import { api, getToken, setToken, setUnauthorizedHandler } from './api'
import { AuthContext } from './authContext'

export default function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  // "checking" only while a saved token is being verified
  const [checking, setChecking] = useState(() => Boolean(getToken()))

  const logout = useCallback(() => {
    setToken('')
    setAdmin(null)
  }, [])

  useEffect(() => {
    setUnauthorizedHandler(logout)
    if (!getToken()) return
    let cancelled = false
    api('/auth/me')
      .then((data) => { if (!cancelled) setAdmin(data.admin) })
      .catch(() => { if (!cancelled) setToken('') })
      .finally(() => { if (!cancelled) setChecking(false) })
    return () => { cancelled = true }
  }, [logout])

  const login = useCallback(async (email, password) => {
    const data = await api('/auth/login', { method: 'POST', body: { email, password } })
    setToken(data.token)
    setAdmin(data.admin)
  }, [])

  const value = useMemo(() => ({ admin, checking, login, logout }), [admin, checking, login, logout])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
