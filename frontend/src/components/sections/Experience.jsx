import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Briefcase, GraduationCap, MapPin, Calendar } from 'lucide-react'
import { experience as staticExperience, education } from '../../data'
import { normalizeExperienceArray } from '../../utils/normalizers'

export default function Experience({ isPage = false }) {
  // As a standalone page the section title is the page h1
  const Heading = isPage ? 'h1' : 'h2'
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  // Normalize static data on init to ensure consistent shape
  const [experience] = useState(() => normalizeExperienceArray(staticExperience))


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

  // Safe array for rendering - defensive check
  const safeExperience = Array.isArray(experience) ? experience : []
  const safeEducation = Array.isArray(education) ? education : []

  return (
    <section id="experience" className="py-20 bg-[var(--bg-secondary)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header - unchanged */}
          <motion.div variants={itemVariants} className="mb-12 md:mb-16 max-w-2xl">
            <span className="text-sm font-semibold text-[var(--accent-primary)] uppercase tracking-wider">
              Career Path
            </span>
            <Heading className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              Experience & Education
            </Heading>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              My journey in technology, combining professional experience with continuous learning.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Experience */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-lg bg-[var(--accent-soft)] text-[var(--accent-primary)]">
                  <Briefcase className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-[var(--text-primary)]">Experience</h3>
              </div>

              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-[var(--border-color)]" />

                {/* Timeline Items - with safe rendering */}
                <div className="space-y-8">
                  {safeExperience.map((exp, index) => (
                    <motion.div
                      key={exp?.id || `exp-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.1 }}
                      className="relative pl-14"
                    >
                      {/* Timeline Dot */}
                      <div className="absolute left-3 top-1 w-5 h-5 rounded-full bg-[var(--accent-primary)] border-4 border-[var(--bg-secondary)]" />

                      <div className="bg-[var(--bg-primary)] rounded-xl p-6 border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-colors">
                        <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--text-muted)] mb-2">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {exp?.period || 'Present'}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={14} />
                            {exp?.location || 'Remote'}
                          </span>
                        </div>

                        <h4 className="text-lg font-bold text-[var(--text-primary)]">
                          {exp?.title || 'Position'}
                        </h4>
                        <p className="text-[var(--accent-primary)] font-medium">
                          {exp?.company || 'Company'}
                        </p>

                        <p className="mt-3 text-sm text-[var(--text-secondary)]">
                          {exp?.description || ''}
                        </p>

                        {/* Safe achievements rendering */}
                        {Array.isArray(exp?.achievements) && exp.achievements.length > 0 && (
                          <ul className="mt-4 space-y-2">
                            {exp.achievements.map((achievement, i) => (
                              <li
                                key={`${exp.id}-achievement-${i}`}
                                className="flex items-start gap-2 text-sm text-[var(--text-muted)]"
                              >
                                <span className="text-[var(--accent-primary)] mt-1">•</span>
                                {typeof achievement === 'string' ? achievement : String(achievement)}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Education - with safe rendering */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-lg bg-[var(--accent-soft)] text-[var(--accent-primary)]">
                  <GraduationCap className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-[var(--text-primary)]">Education</h3>
              </div>

              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-[var(--border-color)]" />

                {/* Timeline Items */}
                <div className="space-y-8">
                  {safeEducation.map((edu, index) => (
                    <motion.div
                      key={edu?.id || `edu-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.1 }}
                      className="relative pl-14"
                    >
                      {/* Timeline Dot */}
                      <div className="absolute left-3 top-1 w-5 h-5 rounded-full bg-[var(--accent-primary)] border-4 border-[var(--bg-secondary)]" />

                      <div className="bg-[var(--bg-primary)] rounded-xl p-6 border border-[var(--border-color)] hover:border-green-500 transition-colors">
                        <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--text-muted)] mb-2">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {edu?.period || ''}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={14} />
                            {edu?.location || ''}
                          </span>
                        </div>

                        <h4 className="text-lg font-bold text-[var(--text-primary)]">
                          {edu?.degree || 'Degree'}
                        </h4>
                        <p className="text-green-700 dark:text-green-400 font-medium">
                          {edu?.institution || 'Institution'}
                        </p>

                        <p className="mt-3 text-sm text-[var(--text-secondary)]">
                          {edu?.description || ''}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Certifications - unchanged */}
              <div className="mt-12">
                <h4 className="text-lg font-bold text-[var(--text-primary)] mb-4">Continuous Learning</h4>
                <div className="flex flex-wrap gap-3">
                  {[
                    'MERN Stack Mastery',
                    'React Advanced Patterns',
                    'Node.js Best Practices',
                    'MongoDB University',
                    'AWS Cloud Practitioner'
                  ].map((cert) => (
                    <span
                      key={cert}
                      className="px-4 py-2 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm text-[var(--text-secondary)]"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
