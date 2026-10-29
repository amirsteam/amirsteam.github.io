import { usePageMeta } from '../hooks/usePageMeta'
import Services from '../components/sections/Services'
import { personalInfo } from '../data'

export default function ServicesPage() {
  usePageMeta({
    title: `Services | ${personalInfo.name}`,
    description: `Web development packages from ${personalInfo.name}: school and campus websites, online stores, news portals and custom MERN apps.`,
    path: '/services/'
  })

  return (
    <>
      <Services isPage />
    </>
  )
}
