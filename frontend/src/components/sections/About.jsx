import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Download, Briefcase, Users, Award, Coffee } from 'lucide-react'
import { personalInfo } from '../../data'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const stats = [
    { icon: Briefcase, value: '20+', label: 'Projects Completed' },
    { icon: Users, value: '100+', label: 'Students Trained' },
    { icon: Award, value: '10+', label: 'Institutions Served' },
    { icon: Coffee, value: '1000+', label: 'Cups of Coffee' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section id="about" className="py-20 bg-[var(--bg-secondary)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-sm font-semibold text-[var(--accent-primary)] uppercase tracking-wider">
              About Me
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
              Engineer. Educator. Creator.
            </h2>
            <div className="mt-4 w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
          </motion.div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <motion.div variants={itemVariants} className="relative">
              <div className="relative">
                {/* Main Image Container */}
                <div className="relative rounded-2xl overflow-hidden">
                  <div className="aspect-square bg-gradient-to-br from-blue-500 to-purple-600 p-1 rounded-2xl">
                    <div className="w-full h-full bg-[var(--bg-primary)] rounded-xl overflow-hidden">
                      {/* Profile Image */}
                      <img
                        src="/images/profile.jpg"
                        alt="Amir Bahadur Shrestha"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-6 -right-6 bg-[var(--bg-primary)] p-4 rounded-xl shadow-xl border border-[var(--border-color)]"
                >
                  <div className="text-center">
                    <span className="text-2xl font-bold text-[var(--accent-primary)]">3+</span>
                    <p className="text-xs text-[var(--text-muted)]">Years Experience</p>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                  className="absolute -bottom-6 -left-6 bg-[var(--bg-primary)] p-4 rounded-xl shadow-xl border border-[var(--border-color)]"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm text-[var(--text-secondary)]">Available for Work</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Text Section */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                {personalInfo.name}
              </h3>
              <p className="text-lg font-medium text-[var(--accent-primary)] mb-6">
                {personalInfo.title}
              </p>

              <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
                {personalInfo.bio.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Goals */}
              <div className="mt-8 flex flex-wrap gap-3">
                {personalInfo.primaryGoals.map((goal) => (
                  <span
                    key={goal}
                    className="px-4 py-2 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-secondary)] text-sm font-medium"
                  >
                    {goal}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8 flex flex-wrap gap-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-shadow"
                >
                  <Download size={20} />
                  Download Resume
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[var(--border-color)] text-[var(--text-primary)] font-semibold hover:border-[var(--accent-primary)] transition-colors"
                >
                  Let's Talk
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-6 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)]"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-4 text-[var(--accent-primary)]" />
                <div className="text-3xl font-bold text-[var(--text-primary)]">{stat.value}</div>
                <div className="text-sm text-[var(--text-muted)]">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
