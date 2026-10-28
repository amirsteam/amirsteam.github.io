import { usePageMeta } from '../hooks/usePageMeta'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Skills from '../components/sections/Skills'
import Projects from '../components/sections/Projects'
import Services from '../components/sections/Services'
import Experience from '../components/sections/Experience'
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
      {/* Work first: visitors see proof before the bio. Backgrounds alternate in this order. */}
      <Hero />
      <Projects />
      <Services />
      <About />
      <Skills />
      <Experience />
      <Testimonials />
      {/* Blog section hidden until there are real posts (components/sections/Blog.jsx) */}
      <Contact />
    </>
  )
}
