import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Code2, Palette, Film, GraduationCap } from 'lucide-react'
import { api } from '../../lib/api'
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
  const [skills, setSkills] = useState(staticSkills || {})

  useEffect(() => {
    async function fetchSkills() {
      try {
        const response = await api.getSkills()
        if (response?.success && Array.isArray(response.data) && response.data.length > 0) {
          // Convert array to object format matching static data structure
          const skillsObj = {}
          response.data.forEach(skill => {
            if (skill?.key) {
              skillsObj[skill.key] = skill
            }
          })
          if (Object.keys(skillsObj).length > 0) {
            setSkills(skillsObj)
            setActiveCategory(response.data[0]?.key || 'mernEngineering')
          }
        }
      } catch (error) {
        console.warn('Skills fetch failed, using static data:', error)
      }
    }
    fetchSkills()
  }, [])

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
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-sm font-semibold text-[var(--accent-primary)] uppercase tracking-wider">
              Expertise
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
              My Skill Pillars
            </h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Four key areas of expertise that I bring to every project, combining technical depth with creative vision.
            </p>
            <div className="mt-4 w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
          </motion.div>

          {/* Skill Category Tabs */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {categories.map((category) => {
              const IconComponent = iconMap[category?.icon] || Code2
              return (
                <motion.button
                  key={category?.key || 'skill'}
                  onClick={() => setActiveCategory(category?.key)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                    activeCategory === category?.key
                      ? 'bg-gradient-to-br ' + (category?.color || 'from-blue-500 to-cyan-500') + ' border-transparent text-white shadow-lg'
                      : 'bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)]'
                  }`}
                >
                  <IconComponent className={`w-8 h-8 mx-auto mb-3 ${activeCategory === category?.key ? 'text-white' : ''}`} />
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
            className="bg-[var(--bg-secondary)] rounded-3xl p-8 border border-[var(--border-color)]"
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left - Description */}
              <div>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${activeSkill?.color || 'from-blue-500 to-cyan-500'} text-white text-sm font-medium mb-4`}>
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

              {/* Right - Skills List */}
              <div className="space-y-4">
                {(Array.isArray(activeSkill?.items) ? activeSkill.items : []).map((skill, skillIndex) => (
                  <div key={skill?.name || `skill-${skillIndex}`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-[var(--text-primary)]">{skill?.name || 'Skill'}</span>
                      <span className="text-sm text-[var(--text-muted)]">{skill?.level || 0}%</span>
                    </div>
                    <div className="h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill?.level || 0}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className={`h-full rounded-full bg-gradient-to-r ${activeSkill?.color || 'from-blue-500 to-cyan-500'}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* All Skills Overview */}
          <motion.div variants={itemVariants} className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, catIndex) => {
              const IconComponent = iconMap[category?.icon] || Code2
              const safeItems = Array.isArray(category?.items) ? category.items : []
              return (
                <div
                  key={category?.key || `cat-${catIndex}`}
                  className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]"
                >
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${category?.color || 'from-blue-500 to-cyan-500'} mb-4`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-[var(--text-primary)] mb-2">{category?.title || 'Skill'}</h4>
                  <p className="text-sm text-[var(--text-muted)]">{category?.description || ''}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {safeItems.slice(0, 3).map((skill, skillIndex) => (
                      <span
                        key={skill?.name || `skill-${catIndex}-${skillIndex}`}
                        className="px-2 py-1 text-xs rounded bg-[var(--bg-tertiary)] text-[var(--text-muted)]"
                      >
                        {skill?.name || 'Skill'}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
