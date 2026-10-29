import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, MapPin, ArrowRight } from 'lucide-react'
import { personalInfo } from '../../data'

// The tools behind the projects on this site
const stack = ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Framer Motion']

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
}

const ease = [0.22, 1, 0.36, 1]

// Round portrait: fades and settles in, an accent ring draws around it, a small
// dot slowly circles the ring, and the photo floats gently. Motion that moves
// things is switched off for visitors who ask for reduced motion (see App.jsx).
function Portrait() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease }}
      className="relative mx-auto lg:mr-0 w-60 sm:w-72 lg:w-80 xl:w-96 aspect-square"
    >
      {/* Ring that draws itself once */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full -rotate-90" aria-hidden="true">
        <circle cx="50" cy="50" r="48.5" fill="none" stroke="var(--border-color)" strokeWidth="0.6" />
        <motion.circle
          cx="50"
          cy="50"
          r="48.5"
          fill="none"
          stroke="var(--accent-primary)"
          strokeWidth="0.9"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 0.7 }}
          transition={{ duration: 1.6, delay: 0.3, ease }}
        />
      </svg>

      {/* Dot that orbits the ring */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      >
        <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[var(--accent-primary)] ring-4 ring-[var(--bg-primary)]" />
      </motion.div>

      {/* Photo with a slow float */}
      <motion.div
        className="absolute inset-[7%]"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <img
          src="/images/profile.jpg"
          alt={`Portrait of ${personalInfo.name}`}
          width={800}
          height={800}
          fetchPriority="high"
          className="w-full h-full object-cover rounded-full bg-[var(--bg-secondary)] shadow-lg"
        />
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  const socialLinks = [
    { name: 'GitHub', icon: Github, url: personalInfo.social.github },
    { name: 'LinkedIn', icon: Linkedin, url: personalInfo.social.linkedin },
    { name: 'Twitter', icon: Twitter, url: personalInfo.social.twitter }
  ]

  return (
    <section id="hero" className="bg-[var(--bg-primary)] border-b border-[var(--border-color)] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="max-w-6xl mx-auto grid gap-10 lg:gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          {/* Text: centered on phones (under the photo), left-aligned from desktop width up */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.p
              variants={itemVariants}
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--success)]"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--success)]" aria-hidden="true" />
              Available for freelance &amp; remote work
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-[var(--text-primary)] text-balance"
            >
              I build full-stack web apps,{' '}
              <span className="text-[var(--accent-primary)]">and teach developers to build them.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg md:text-xl text-[var(--text-secondary)] max-w-xl mx-auto lg:mx-0 text-pretty"
            >
              I'm {personalInfo.name}, a MERN stack developer and educator from Nepal.
              I take a product from database design to a polished React interface:
              secure logins, admin dashboards, online payments and smooth animation.
            </motion.p>

            <motion.ul
              variants={itemVariants}
              aria-label="Main tools"
              className="mt-6 flex flex-wrap justify-center lg:justify-start gap-2"
            >
              {stack.map((tool) => (
                <li
                  key={tool}
                  className="px-3 py-1 rounded-md text-sm font-medium bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-color)]"
                >
                  {tool}
                </li>
              ))}
            </motion.ul>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-sm md:text-base text-[var(--text-muted)] max-w-xl mx-auto lg:mx-0 text-pretty"
            >
              Recently shipped: an online store with eSewa and Khalti payments,
              a news portal with its own mobile app, and the course platform where I teach MERN.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-8 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-3">
              <Link
                to="/projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[var(--accent-primary)] text-[var(--accent-contrast)] font-semibold hover:bg-[var(--accent-hover)] transition-colors"
              >
                See my projects
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-[var(--border-color)] text-[var(--text-primary)] font-semibold hover:border-[var(--accent-primary)] transition-colors"
              >
                Start a project
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 text-sm text-[var(--text-muted)]"
            >
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={16} aria-hidden="true" />
                {`${personalInfo.location.city}, ${personalInfo.location.country}`} · {personalInfo.availability}
              </span>
              <span className="flex items-center gap-1">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
                    aria-label={`${social.name} (opens in new tab)`}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
                  aria-label="Email"
                >
                  <Mail size={20} />
                </a>
              </span>
            </motion.div>
          </motion.div>

          {/* Photo: first on phones, right column from desktop width up */}
          <div className="order-first lg:order-none">
            <Portrait />
          </div>
        </div>
      </div>
    </section>
  )
}
