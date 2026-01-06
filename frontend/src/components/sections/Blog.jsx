import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'
import { blogPosts } from '../../data'
import { formatDate } from '../../utils/dateUtils'

export default function Blog() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

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
    <section id="blog" className="py-20 bg-[var(--bg-secondary)]">
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
              Blog & Articles
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
              Latest Insights
            </h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Sharing knowledge about MERN stack development, best practices, and industry insights.
            </p>
            <div className="mt-4 w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
          </motion.div>

          {/* Featured Post */}
          {blogPosts.length > 0 && (
            <motion.div variants={itemVariants} className="mb-12">
              <Link to={`/blog/${blogPosts[0].slug}`}>
                <motion.article
                  whileHover={{ y: -5 }}
                  className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-colors"
                >
                  <div className="grid md:grid-cols-2 gap-8 p-8">
                    <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="text-6xl">📚</span>
                    </div>
                    
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] text-sm font-medium">
                          Featured
                        </span>
                        <span className="px-3 py-1 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-muted)] text-sm">
                          {blogPosts[0].category}
                        </span>
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4 group-hover:text-[var(--accent-primary)] transition-colors">
                        {blogPosts[0].title}
                      </h3>

                      <p className="text-[var(--text-secondary)] mb-6">
                        {blogPosts[0].excerpt}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {formatDate(blogPosts[0].publishedAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {blogPosts[0].readTime}
                        </span>
                      </div>

                      <motion.span
                        className="inline-flex items-center gap-1 mt-6 text-[var(--accent-primary)] font-medium"
                      >
                        Read Article <ArrowRight size={16} />
                      </motion.span>
                    </div>
                  </div>
                </motion.article>
              </Link>
            </motion.div>
          )}

          {/* Blog Posts Grid */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post, index) => (
              <Link key={post.id} to={`/blog/${post.slug}`}>
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="h-full bg-[var(--bg-primary)] rounded-2xl overflow-hidden border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
                    <span className="text-5xl">
                      {post.category === 'Development' && '💻'}
                      {post.category === 'Security' && '🔐'}
                      {post.category === 'Frontend' && '🎨'}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 rounded text-xs font-medium bg-[var(--bg-secondary)] text-[var(--accent-primary)]">
                        {post.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 line-clamp-2 group-hover:text-[var(--accent-primary)] transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-sm text-[var(--text-muted)]">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {formatDate(post.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.readTime}
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 px-2 py-1 text-xs rounded bg-[var(--bg-secondary)] text-[var(--text-muted)]"
                        >
                          <Tag size={10} />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              </Link>
            ))}
          </motion.div>

          {/* View All CTA */}
          <motion.div variants={itemVariants} className="text-center mt-12">
            <Link to="/blog">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-shadow"
              >
                View All Articles
                <ArrowRight size={20} />
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
