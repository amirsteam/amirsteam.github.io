import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Code2, Palette, Film, GraduationCap } from 'lucide-react'
import { skills as staticSkills } from '../../data'

const iconMap = {
  Code2,
  Palette,
  Film,
  GraduationCap
}

// Default skill for fallback
const defaultSkill = {
  title: 'Skills',
  icon: 'Code2',
  color: 'from-blue-500 to-cyan-500',
  description: 'Technical skills and expertise',
  items: []
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeCategory, setActiveCategory] = useState('mernEngineering')
  const [skills] = useState(staticSkills || {})


  // Safe categories extraction
  const safeSkills = skills && typeof skills === 'object' ? skills : {}
  const categories = Object.entries(safeSkills).map(([key, value]) => ({
    key,
    ...(value || {})
  }))

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

  // Safe activeSkill with fallback
  const activeSkill = safeSkills[activeCategory] || defaultSkill

  return (
    <section id="skills" className="py-20 bg-[var(--bg-primary)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-12 md:mb-16 max-w-2xl">
            <span className="text-sm font-semibold text-[var(--accent-primary)] uppercase tracking-wider">
              Expertise
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              My Skill Pillars
            </h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              Four key areas of expertise that I bring to every project, combining technical depth with creative vision.
            </p>
          </motion.div>

          {/* Skill Category Tabs */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {categories.map((category) => {
              const IconComponent = iconMap[category?.icon] || Code2
              return (
                <motion.button
                  key={category?.key || 'skill'}
                  onClick={() => setActiveCategory(category?.key)}
                  aria-pressed={activeCategory === category?.key}
                  className={`p-5 rounded-xl border text-left transition-colors ${
                    activeCategory === category?.key
                      ? 'bg-[var(--accent-soft)] border-[var(--accent-primary)] text-[var(--accent-primary)]'
                      : 'bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)]'
                  }`}
                >
                  <IconComponent className="w-6 h-6 mb-3" aria-hidden="true" />
                  <h3 className="font-semibold text-sm md:text-base">{category?.title || 'Skill'}</h3>
                </motion.button>
              )
            })}
          </motion.div>

          {/* Active Skill Details */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-[var(--bg-secondary)] rounded-xl p-8 border border-[var(--border-color)]"
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left - Description */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[var(--accent-soft)] text-[var(--accent-primary)] text-sm font-medium mb-4">
                  {(() => {
                    const IconComponent = iconMap[activeSkill?.icon] || Code2
                    return <IconComponent size={16} />
                  })()}
                  {activeSkill?.title || 'Skills'}
                </div>
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                  {activeSkill?.title || 'Skills'}
                </h3>
                <p className="text-[var(--text-secondary)] mb-6">
                  {activeSkill?.description || ''}
                </p>

                {/* Tech Logos for MERN */}
                {activeCategory === 'mernEngineering' && (
                  <div className="flex flex-wrap gap-4">
                    {['react', 'nodejs', 'mongodb', 'express'].map((tech) => (
                      <div key={tech} className="p-3 bg-[var(--bg-primary)] rounded-xl border border-[var(--border-color)]">
                        <img
                          src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech}/${tech}-original${tech === 'express' ? '-wordmark' : ''}.svg`}
                          alt={tech}
                          className="w-10 h-10"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Adobe logos for Graphics */}
                {activeCategory === 'graphicsMotion' && (
                  <div className="flex flex-wrap gap-4">
                    {['photoshop', 'illustrator', 'premierepro', 'aftereffects'].map((tech) => (
                      <div key={tech} className="p-3 bg-[var(--bg-primary)] rounded-xl border border-[var(--border-color)]">
                        <img
                          src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech}/${tech}-original.svg`}
                          alt={tech}
                          className="w-10 h-10"
                          onError={(e) => {
                            e.target.style.display = 'none'
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right - skills as plain tags (no self-rated percentages) and where they were used */}
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-3">
                  Tools &amp; skills
                </h4>
                <ul className="flex flex-wrap gap-2">
                  {(Array.isArray(activeSkill?.items) ? activeSkill.items : []).map((skill, skillIndex) => (
                    <li
                      key={skill?.name || `skill-${skillIndex}`}
                      className="px-3 py-1.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)]"
                    >
                      {skill?.name || 'Skill'}
                    </li>
                  ))}
                </ul>

                {Array.isArray(activeSkill?.usedIn) && activeSkill.usedIn.length > 0 && (
                  <>
                    <h4 className="mt-8 text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-3">
                      Used in
                    </h4>
                    <ul className="space-y-2">
                      {activeSkill.usedIn.map((projectName) => (
                        <li key={projectName}>
                          <a
                            href="#projects"
                            className="text-[var(--accent-primary)] font-medium hover:underline"
                          >
                            {projectName}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
