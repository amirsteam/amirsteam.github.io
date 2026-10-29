import { usePageMeta } from '../hooks/usePageMeta'
import About from '../components/sections/About'
import Experience from '../components/sections/Experience'
import { personalInfo } from '../data'

export default function AboutPage() {
  usePageMeta({
    title: `About | ${personalInfo.name}`,
    description: `About ${personalInfo.name}: MERN stack developer and educator from Nepal, with his experience and education.`,
    path: '/about/'
  })

  return (
    <>
      <About isPage />
      <Experience />
    </>
  )
}
