import { Helmet } from 'react-helmet-async'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Skills from '../components/sections/Skills'
import Projects from '../components/sections/Projects'
import Services from '../components/sections/Services'
import Experience from '../components/sections/Experience'
import Testimonials from '../components/sections/Testimonials'
import Blog from '../components/sections/Blog'
import Contact from '../components/sections/Contact'
import { personalInfo } from '../data'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>{personalInfo.name} | {personalInfo.title}</title>
        <meta name="description" content={personalInfo.tagline} />
      </Helmet>
      
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Services />
      <Experience />
      <Testimonials />
      <Blog />
      <Contact />
    </>
  )
}
