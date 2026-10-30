import { CheckCircle2, CircleDot, Loader2, AlertTriangle } from 'lucide-react'
import { liveContentAt, publishState, timeAgo, useSiteStatus } from '../siteStatus'

// One line saying whether the live site matches what's saved in the CMS
export default function PublishStatus() {
  const { summary } = useSiteStatus()
  const { state, since } = publishState(summary)
  const lastPublished = liveContentAt ? `Live site content from ${timeAgo(liveContentAt)}.` : ''

  const views = {
    live: {
      icon: CheckCircle2,
      color: 'text-[var(--success)]',
      text: 'The live site is up to date.'
    },
    pending: {
      icon: CircleDot,
      color: 'text-[var(--warning)]',
      text: `You have changes that aren't on the live site yet (last saved ${timeAgo(since)}). Press Publish site when you're ready.`
    },
    publishing: {
      icon: Loader2,
      color: 'text-[var(--accent-primary)]',
      text: `Publishing started ${timeAgo(since)}. Reload this page in a couple of minutes to confirm it's live.`
    },
    stale: {
      icon: AlertTriangle,
      color: 'text-[var(--error)]',
      text: `A publish was started ${timeAgo(since)} but this page still shows older content. Reload the page; if this stays, check the GitHub Actions log or publish again.`
    }
  }
  const view = views[state]
  if (!view) return null

  return (
    <p role="status" className="flex items-start gap-2 text-sm">
      <view.icon size={18} className={`${view.color} shrink-0 mt-px ${state === 'publishing' ? 'animate-spin' : ''}`} aria-hidden="true" />
      <span>
        <span className="font-medium text-[var(--text-primary)]">{view.text}</span>
        {lastPublished && <span className="block text-[var(--text-muted)]">{lastPublished}</span>}
      </span>
    </p>
  )
}
