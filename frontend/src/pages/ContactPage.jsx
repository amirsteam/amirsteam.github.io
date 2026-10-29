import { usePageMeta } from '../hooks/usePageMeta'
import Contact from '../components/sections/Contact'
import { personalInfo } from '../data'

export default function ContactPage() {
  usePageMeta({
    title: `Contact | ${personalInfo.name}`,
    description: `Get in touch with ${personalInfo.name} about a web app, a MERN course or a job. Replies within 24 hours.`,
    path: '/contact/'
  })

  return (
    <>
      <Contact isPage />
    </>
  )
}
