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

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeCategory, setActiveCategory] = useState('mernEngineering')
  const [skills, setSkills] = useState(staticSkills)

  useEffect(() => {
    async function fetchSkills() {
      const response = await api.getSkills()
      if (response?.success && response.data?.length > 0) {
        // Convert array to object format matching static data structure
        const skillsObj = {}
        response.data.forEach(skill => {
          skillsObj[skill.key] = skill
        })
        setSkills(skillsObj)
        setActiveCategory(response.data[0]?.key || 'mernEngineering')
      }
    }
    fetchSkills()
  }, [])

  const categories = Object.entries(skills).map(([key, value]) => ({
    key,
    ...value
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

  const activeSkill = skills[activeCategory]

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
              const IconComponent = iconMap[category.icon]
              return (
                <motion.button
                  key={category.key}
                  onClick={() => setActiveCategory(category.key)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                    activeCategory === category.key
                      ? 'bg-gradient-to-br ' + category.color + ' border-transparent text-white shadow-lg'
                      : 'bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)]'
                  }`}
                >
                  <IconComponent className={`w-8 h-8 mx-auto mb-3 ${activeCategory === category.key ? 'text-white' : ''}`} />
                  <h3 className="font-semibold text-sm md:text-base">{category.title}</h3>
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
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${activeSkill.color} text-white text-sm font-medium mb-4`}>
                  {(() => {
                    const IconComponent = iconMap[activeSkill.icon]
                    return <IconComponent size={16} />
                  })()}
                  {activeSkill.title}
                </div>
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                  {activeSkill.title}
                </h3>
                <p className="text-[var(--text-secondary)] mb-6">
                  {activeSkill.description}
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
                {activeSkill.items.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-[var(--text-primary)]">{skill.name}</span>
                      <span className="text-sm text-[var(--text-muted)]">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className={`h-full rounded-full bg-gradient-to-r ${activeSkill.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* All Skills Overview */}
          <motion.div variants={itemVariants} className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const IconComponent = iconMap[category.icon]
              return (
                <div
                  key={category.key}
                  className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]"
                >
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${category.color} mb-4`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-[var(--text-primary)] mb-2">{category.title}</h4>
                  <p className="text-sm text-[var(--text-muted)]">{category.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {category.items.slice(0, 3).map((skill) => (
                      <span
                        key={skill.name}
                        className="px-2 py-1 text-xs rounded bg-[var(--bg-tertiary)] text-[var(--text-muted)]"
                      >
                        {skill.name}
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
