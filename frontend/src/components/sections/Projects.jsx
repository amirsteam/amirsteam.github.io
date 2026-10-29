import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ExternalLink, Github, ChevronRight, Code2 } from 'lucide-react'
import { projects as staticProjects, personalInfo } from '../../data'
import { normalizeProjectArray } from '../../utils/normalizers'

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeFilter, setActiveFilter] = useState('All')
  // Normalize static data on init
  const [projects] = useState(() => normalizeProjectArray(staticProjects))


  // Defensive array check
  const safeProjects = Array.isArray(projects) ? projects : []
  const categories = ['All', ...new Set(safeProjects.map((p) => p?.category || 'Other').filter(Boolean))]
  const filteredProjects = activeFilter === 'All'
    ? safeProjects
    : safeProjects.filter((p) => p?.category === activeFilter)

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
    <section id="projects" className="py-20 bg-[var(--bg-secondary)]">
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
              Portfolio
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              Featured Projects
            </h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              Real-world projects that demonstrate my expertise in building scalable, production-ready applications.
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === category
                    ? 'bg-[var(--accent-soft)] text-[var(--accent-primary)] border border-[var(--accent-primary)]'
                    : 'bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] border border-[var(--border-color)]'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => {
              const safeTechStack = Array.isArray(project?.techStack) ? project.techStack : []
              return (
              <motion.div
                key={project?.id || `project-${index}`}
                layout
                variants={itemVariants}
                className="group relative flex flex-col bg-[var(--bg-primary)] rounded-xl overflow-hidden border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-colors duration-300"
              >
                {/* Thumbnail: real screenshot, or a plain code panel when there is none */}
                <div className="relative aspect-video overflow-hidden border-b border-[var(--border-color)] bg-[var(--bg-tertiary)]">
                  {project?.thumbnail ? (
                    <img
                      src={project.thumbnail}
                      alt={`Screenshot of ${project?.title || 'project'}`}
                      width={960}
                      height={540}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[var(--text-secondary)]">
                      <Code2 size={40} aria-hidden="true" />
                      <span className="text-sm font-medium">Source code on GitHub</span>
                    </div>
                  )}

                  {project?.featured && (
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[var(--bg-primary)] text-[var(--text-primary)] text-xs font-semibold shadow">
                      Featured
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 rounded text-xs font-medium bg-[var(--bg-secondary)] text-[var(--accent-primary)]">
                      {project?.category || 'Project'}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-primary)] transition-colors">
                    {project?.title || 'Project'}
                  </h3>
                  
                  <p className="text-sm text-[var(--text-secondary)] mb-4">
                    {project?.description || ''}
                  </p>

                  {/* Problem & Solution */}
                  <dl className="space-y-2 mb-4 text-sm">
                    {project?.problem && (
                    <div>
                      <dt className="font-semibold text-[var(--text-primary)]">Problem</dt>
                      <dd className="text-[var(--text-secondary)]">{project.problem}</dd>
                    </div>
                    )}
                    {project?.solution && (
                    <div>
                      <dt className="font-semibold text-[var(--text-primary)]">What I built</dt>
                      <dd className="text-[var(--text-secondary)]">{project.solution}</dd>
                    </div>
                    )}
                  </dl>

                  {/* Tech Stack - defensive rendering */}
                  {safeTechStack.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {safeTechStack.slice(0, 4).map((tech, techIndex) => (
                      <span
                        key={`${project?.id || index}-tech-${techIndex}`}
                        className="px-2 py-1 text-xs rounded bg-[var(--bg-secondary)] text-[var(--text-muted)]"
                      >
                        {typeof tech === 'string' ? tech : String(tech)}
                      </span>
                    ))}
                    {safeTechStack.length > 4 && (
                      <span className="px-2 py-1 text-xs rounded bg-[var(--bg-secondary)] text-[var(--text-muted)]">
                        +{safeTechStack.length - 4}
                      </span>
                    )}
                  </div>
                  )}

                  {/* Links: always visible, so they work on touch and keyboard */}
                  {(project?.liveUrl || project?.githubUrl) && (
                  <div className="mt-auto pt-2 flex flex-wrap gap-4">
                    {project?.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent-primary)] hover:underline"
                      >
                        <ExternalLink size={16} aria-hidden="true" />
                        Live site
                        <span className="sr-only">for {project.title} (opens in new tab)</span>
                      </a>
                    )}
                    {project?.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent-primary)] hover:underline"
                      >
                        <Github size={16} aria-hidden="true" />
                        Source code
                        <span className="sr-only">for {project.title} (opens in new tab)</span>
                      </a>
                    )}
                  </div>
                  )}
                </div>
              </motion.div>
            )})}
          </motion.div>

          {/* View All Projects CTA */}
          <motion.div variants={itemVariants} className="text-center mt-12">
            <motion.a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--accent-primary)] text-[var(--accent-contrast)] hover:bg-[var(--accent-hover)] font-semibold transition-colors"
            >
              <Github size={20} aria-hidden="true" />
              More on GitHub
              <ChevronRight size={20} aria-hidden="true" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
