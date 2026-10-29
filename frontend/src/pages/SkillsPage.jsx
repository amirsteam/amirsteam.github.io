import { usePageMeta } from '../hooks/usePageMeta'
import Skills from '../components/sections/Skills'
import { personalInfo } from '../data'

export default function SkillsPage() {
  usePageMeta({
    title: `Skills | ${personalInfo.name}`,
    description: `The tools and skills ${personalInfo.name} uses: MERN engineering, UI and animation, graphics and motion design, teaching and consulting.`,
    path: '/skills/'
  })

  return (
    <>
      <Skills isPage />
    </>
  )
}
