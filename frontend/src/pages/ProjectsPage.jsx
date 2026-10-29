import { usePageMeta } from '../hooks/usePageMeta'
import Projects from '../components/sections/Projects'
import { personalInfo } from '../data'

export default function ProjectsPage() {
  usePageMeta({
    title: `Projects | ${personalInfo.name}`,
    description: `Live client work and open-source projects by ${personalInfo.name}: online stores, school platforms and APIs built with React, Node.js and MongoDB.`,
    path: '/projects/'
  })

  return (
    <>
      <Projects isPage />
    </>
  )
}
