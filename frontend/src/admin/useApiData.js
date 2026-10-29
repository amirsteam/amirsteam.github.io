import { useCallback, useEffect, useState } from 'react'
import { api } from './api'

// Loads GET data from the API. reload() fetches again.
export function useApiData(path) {
  const [state, setState] = useState({ data: null, error: null, loading: true })
  const [version, setVersion] = useState(0)

  useEffect(() => {
    let cancelled = false
    api(path)
      .then((data) => { if (!cancelled) setState({ data, error: null, loading: false }) })
      .catch((error) => { if (!cancelled) setState((s) => ({ ...s, error, loading: false })) })
    return () => { cancelled = true }
  }, [path, version])

  const reload = useCallback(() => {
    setState((s) => ({ ...s, loading: true }))
    setVersion((v) => v + 1)
  }, [])

  return { ...state, reload }
}
