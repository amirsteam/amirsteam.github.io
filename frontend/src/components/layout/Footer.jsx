import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Youtube, 
  Mail, 
  MapPin, 
  Phone,
  ArrowUp
} from 'lucide-react'
import { personalInfo, navLinks } from '../../data'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socialLinks = [
    { name: 'GitHub', icon: Github, url: personalInfo.social.github },
    { name: 'LinkedIn', icon: Linkedin, url: personalInfo.social.linkedin },
    { name: 'Twitter', icon: Twitter, url: personalInfo.social.twitter },
    { name: 'YouTube', icon: Youtube, url: personalInfo.social.youtube }
  ]

  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-color)]">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                Amir
              </span>
              <span className="text-2xl font-bold text-[var(--accent-primary)]">.</span>
            </Link>
            <p className="mt-4 text-[var(--text-secondary)] max-w-md">
              {personalInfo.tagline}
            </p>
            
            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                <MapPin size={18} className="text-[var(--accent-primary)]" />
                <span>{`${personalInfo.location.city}, ${personalInfo.location.district}, ${personalInfo.location.country}`}</span>
              </div>
              <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                <Mail size={18} className="text-[var(--accent-primary)]" />
                <a href={`mailto:${personalInfo.email}`} className="hover:text-[var(--accent-primary)] transition-colors">
                  {personalInfo.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                <Phone size={18} className="text-[var(--accent-primary)]" />
                <a href={`tel:${personalInfo.phone}`} className="hover:text-[var(--accent-primary)] transition-colors">
                  {personalInfo.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-[var(--text-secondary)]">Web Development</span>
              </li>
              <li>
                <span className="text-[var(--text-secondary)]">MERN Stack Apps</span>
              </li>
              <li>
                <span className="text-[var(--text-secondary)]">Admin Dashboards</span>
              </li>
              <li>
                <span className="text-[var(--text-secondary)]">E-Commerce Solutions</span>
              </li>
              <li>
                <span className="text-[var(--text-secondary)]">Digital Consulting</span>
              </li>
              <li>
                <span className="text-[var(--text-secondary)]">Teaching & Mentoring</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-12 pt-8 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:bg-[var(--bg-primary)] transition-colors"
                aria-label={social.name}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>

          {/* Scroll to Top */}
          <motion.button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-[var(--accent-soft)] text-[var(--accent-primary)]"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[var(--bg-tertiary)] py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-[var(--text-muted)]">
            <p>
              © {currentYear} {personalInfo.name}. All rights reserved.
            </p>
            <p>Built with React and Tailwind CSS</p>
          </div>
        </div>
      </div>

    </footer>
  )
}
