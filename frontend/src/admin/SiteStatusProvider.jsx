import { useMemo } from 'react'
import { useApiData } from './useApiData'
import { SiteStatusContext } from './siteStatus'

export default function SiteStatusProvider({ children }) {
  const { data, error, loading, reload } = useApiData('/admin/summary')
  const value = useMemo(
    () => ({ summary: data, error, loading, refresh: reload }),
    [data, error, loading, reload]
  )
  return <SiteStatusContext.Provider value={value}>{children}</SiteStatusContext.Provider>
}
