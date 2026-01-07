import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { ExternalLink, Github, Play, ChevronRight } from 'lucide-react'
import { api } from '../../lib/api'
import { projects as staticProjects } from '../../data'

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeFilter, setActiveFilter] = useState('All')
  const [hoveredProject, setHoveredProject] = useState(null)
  const [projects, setProjects] = useState(staticProjects)

  useEffect(() => {
    async function fetchProjects() {
      const response = await api.getProjects()
      if (response?.success && response.data?.length > 0) {
        setProjects(response.data)
      }
    }
    fetchProjects()
  }, [])

  const categories = ['All', ...new Set(projects.map((p) => p.category))]
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter((p) => p.category === activeFilter)

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
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-sm font-semibold text-[var(--accent-primary)] uppercase tracking-wider">
              Portfolio
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
              Featured Projects
            </h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Real-world projects that demonstrate my expertise in building scalable, production-ready applications.
            </p>
            <div className="mt-4 w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
          </motion.div>

          {/* Filter Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveFilter(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === category
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] border border-[var(--border-color)]'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                variants={itemVariants}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group relative bg-[var(--bg-primary)] rounded-2xl overflow-hidden border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/80 to-purple-600/80 flex items-center justify-center">
                    <span className="text-6xl">
                      {project.id === 1 && '📰'}
                      {project.id === 2 && '🛒'}
                      {project.id === 3 && '🏫'}
                      {project.id === 4 && '🎓'}
                      {project.id === 5 && '💼'}
                      {project.id === 6 && '📊'}
                    </span>
                  </div>
                  
                  {/* Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-between p-4"
                  >
                    <div className="flex gap-2">
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-lg bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
                        aria-label="View live site"
                      >
                        <ExternalLink size={18} />
                      </motion.a>
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-lg bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
                        aria-label="View source code"
                      >
                        <Github size={18} />
                      </motion.a>
                    </div>
                    {project.videoPreview && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-lg bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
                        aria-label="Play video preview"
                      >
                        <Play size={18} />
                      </motion.button>
                    )}
                  </motion.div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-semibold">
                      Featured
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 rounded text-xs font-medium bg-[var(--bg-secondary)] text-[var(--accent-primary)]">
                      {project.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-primary)] transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Problem & Solution */}
                  <div className="space-y-2 mb-4">
                    <div className="text-xs">
                      <span className="font-semibold text-red-500">Problem:</span>
                      <span className="text-[var(--text-muted)] ml-1 line-clamp-1">{project.problem}</span>
                    </div>
                    <div className="text-xs">
                      <span className="font-semibold text-green-500">Solution:</span>
                      <span className="text-[var(--text-muted)] ml-1 line-clamp-1">{project.solution}</span>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded bg-[var(--bg-secondary)] text-[var(--text-muted)]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="px-2 py-1 text-xs rounded bg-[var(--bg-secondary)] text-[var(--text-muted)]">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  {/* View Details Link */}
                  <motion.a
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-[var(--accent-primary)] hover:underline"
                  >
                    View Details <ChevronRight size={16} />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* View All Projects CTA */}
          <motion.div variants={itemVariants} className="text-center mt-12">
            <motion.a
              href="/projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-shadow"
            >
              View All Projects
              <ChevronRight size={20} />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
