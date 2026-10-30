import { createContext, useContext } from 'react'
import cms from '../data/cms.json'

// Dashboard summary (counts, when content last changed, when a publish was last
// requested), shared by the sidebar, the Publish button and the Dashboard.
export const SiteStatusContext = createContext({ summary: null, error: null, loading: true, refresh: () => {} })
export const useSiteStatus = () => useContext(SiteStatusContext)

// When the content in this build of the site was fetched from the CMS.
// The dashboard is part of the live site, so this is the live content's age.
export const liveContentAt = cms.generatedAt ? new Date(cms.generatedAt) : null

// A publish normally takes about 2 minutes; after this we stop saying "publishing"
const PUBLISH_WINDOW_MS = 10 * 60 * 1000

// Is the live site behind what's saved in the CMS?
//   live:       nothing saved since the live site was built
//   pending:    saved changes, not published yet
//   publishing: publish requested after the last change, in the last 10 minutes
//   stale:      publish requested a while ago but this page still shows older content
export function publishState(summary, now = Date.now()) {
  if (!summary) return { state: 'unknown' }
  const changed = summary.contentUpdatedAt ? new Date(summary.contentUpdatedAt) : null
  const requested = summary.publishRequestedAt ? new Date(summary.publishRequestedAt) : null
  if (!changed || (liveContentAt && changed <= liveContentAt)) return { state: 'live' }
  if (requested && requested >= changed) {
    return now - requested < PUBLISH_WINDOW_MS
      ? { state: 'publishing', since: requested }
      : { state: 'stale', since: requested }
  }
  return { state: 'pending', since: changed }
}

export function timeAgo(date, now = Date.now()) {
  const minutes = Math.round((now - new Date(date)) / 60000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours} h ago`
  return new Date(date).toLocaleDateString(undefined, { dateStyle: 'medium' })
}
