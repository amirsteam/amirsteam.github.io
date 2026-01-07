import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Briefcase, GraduationCap, MapPin, Calendar } from 'lucide-react'
import { api } from '../../lib/api'
import { experience as staticExperience, education } from '../../data'

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [experience, setExperience] = useState(staticExperience)

  useEffect(() => {
    async function fetchExperience() {
      const response = await api.getExperience()
      if (response?.success && response.data?.length > 0) {
        setExperience(response.data)
      }
    }
    fetchExperience()
  }, [])

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
    <section id="experience" className="py-20 bg-[var(--bg-secondary)]">
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
              Career Path
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
              Experience & Education
            </h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              My journey in technology, combining professional experience with continuous learning.
            </p>
            <div className="mt-4 w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Experience */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[var(--text-primary)]">Experience</h3>
              </div>

              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600" />

                {/* Timeline Items */}
                <div className="space-y-8">
                  {experience.map((exp, index) => (
                    <motion.div
                      key={exp.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.1 }}
                      className="relative pl-14"
                    >
                      {/* Timeline Dot */}
                      <div className="absolute left-3 top-1 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 border-4 border-[var(--bg-secondary)]" />

                      <div className="bg-[var(--bg-primary)] rounded-2xl p-6 border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-colors">
                        <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--text-muted)] mb-2">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {exp.period}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={14} />
                            {exp.location}
                          </span>
                        </div>

                        <h4 className="text-lg font-bold text-[var(--text-primary)]">{exp.title}</h4>
                        <p className="text-[var(--accent-primary)] font-medium">{exp.company}</p>

                        <p className="mt-3 text-sm text-[var(--text-secondary)]">{exp.description}</p>

                        {exp.achievements && (
                          <ul className="mt-4 space-y-2">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                                <span className="text-[var(--accent-primary)] mt-1">•</span>
                                {achievement}
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

            {/* Education */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[var(--text-primary)]">Education</h3>
              </div>

              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 to-emerald-500" />

                {/* Timeline Items */}
                <div className="space-y-8">
                  {education.map((edu, index) => (
                    <motion.div
                      key={edu.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.1 }}
                      className="relative pl-14"
                    >
                      {/* Timeline Dot */}
                      <div className="absolute left-3 top-1 w-5 h-5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 border-4 border-[var(--bg-secondary)]" />

                      <div className="bg-[var(--bg-primary)] rounded-2xl p-6 border border-[var(--border-color)] hover:border-green-500 transition-colors">
                        <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--text-muted)] mb-2">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {edu.period}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={14} />
                            {edu.location}
                          </span>
                        </div>

                        <h4 className="text-lg font-bold text-[var(--text-primary)]">{edu.degree}</h4>
                        <p className="text-green-500 font-medium">{edu.institution}</p>

                        <p className="mt-3 text-sm text-[var(--text-secondary)]">{edu.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
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
