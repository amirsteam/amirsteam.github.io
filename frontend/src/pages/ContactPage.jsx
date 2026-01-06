import { Helmet } from 'react-helmet-async'
import Contact from '../components/sections/Contact'
import { personalInfo } from '../data'

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact | {personalInfo.name}</title>
        <meta name="description" content={`Get in touch with ${personalInfo.name}. ${personalInfo.tagline}`} />
      </Helmet>
      
      <div className="pt-8">
        <Contact />
      </div>
    </>
  )
}
