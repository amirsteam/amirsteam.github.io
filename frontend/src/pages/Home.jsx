import { usePageMeta } from '../hooks/usePageMeta'
import Hero from '../components/sections/Hero'
import Projects from '../components/sections/Projects'
import Testimonials from '../components/sections/Testimonials'
import Contact from '../components/sections/Contact'
import { personalInfo } from '../data'

export default function Home() {
  usePageMeta({
    title: `${personalInfo.name} | MERN Stack Developer & Educator in Nepal`,
    description: 'I build web apps that businesses and schools run on: online stores, school systems and course platforms with React, Node.js and MongoDB. Based in Nepal, working remotely.',
    path: '/'
  })

  return (
    <>
      {/* Home: who I am, best work, what clients say, how to reach me.
          Services, About and Skills have their own pages. Backgrounds alternate. */}
      <Hero />
      <Projects featuredOnly />
      <Testimonials />
      <Contact />
    </>
  )
}
