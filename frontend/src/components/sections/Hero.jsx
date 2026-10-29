import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, MapPin, ArrowRight } from 'lucide-react'
import { personalInfo } from '../../data'

// Calm, left-aligned hero: what I build, real proof, one primary action.
// See DESIGN.md: no gradients, blobs or floating decoration.
export default function Hero() {
  const socialLinks = [
    { name: 'GitHub', icon: Github, url: personalInfo.social.github },
    { name: 'LinkedIn', icon: Linkedin, url: personalInfo.social.linkedin },
    { name: 'Twitter', icon: Twitter, url: personalInfo.social.twitter }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  }

  return (
    <section id="hero" className="bg-[var(--bg-primary)] border-b border-[var(--border-color)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-[1.5fr_1fr] md:items-center">
          {/* Text */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.p
              variants={itemVariants}
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--success)]"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--success)]" aria-hidden="true" />
              Available for freelance &amp; remote work
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-[var(--text-primary)] text-balance"
            >
              I build web apps that{' '}
              <span className="text-[var(--accent-primary)]">businesses and schools</span>{' '}
              run on.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg md:text-xl text-[var(--text-secondary)] max-w-xl"
            >
              I'm {personalInfo.name}, a MERN stack developer and educator from Nepal.
              Recent work: a live online store with eSewa and Khalti payments, and my own MERN course platform.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[var(--accent-primary)] text-[var(--accent-contrast)] font-semibold hover:bg-[var(--accent-hover)] transition-colors"
              >
                See my projects
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-[var(--border-color)] text-[var(--text-primary)] font-semibold hover:border-[var(--accent-primary)] transition-colors"
              >
                Get in touch
              </a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[var(--text-muted)]"
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

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-first md:order-none"
          >
            <img
              src="/images/profile.jpg"
              alt={`Portrait of ${personalInfo.name}`}
              width={800}
              height={800}
              fetchPriority="high"
              className="w-40 h-40 md:w-full md:h-auto md:max-w-sm md:ml-auto aspect-square object-cover rounded-xl border border-[var(--border-color)]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
