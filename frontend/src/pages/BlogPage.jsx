import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, Clock, Tag, ArrowRight, Search } from 'lucide-react'
import { useState } from 'react'
import { blogPosts, personalInfo } from '../data'
import { formatDate } from '../utils/dateUtils'

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', ...new Set(blogPosts.map((post) => post.category))]

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <>
      <Helmet>
        <title>Blog | {personalInfo.name}</title>
        <meta name="description" content="Articles and insights about MERN stack development, best practices, and industry insights." />
      </Helmet>

      <div className="py-20 bg-[var(--bg-primary)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <span className="text-sm font-semibold text-[var(--accent-primary)] uppercase tracking-wider">
                Blog
              </span>
              <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
                Articles & Insights
              </h1>
              <p className="mt-4 text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
                Sharing knowledge about MERN stack development, best practices, and lessons learned from real-world projects.
              </p>
              <div className="mt-4 w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
            </motion.div>

            {/* Search & Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12 space-y-4"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={20} />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)]"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] border border-[var(--border-color)]'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Blog Posts Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="bg-[var(--bg-secondary)] rounded-2xl overflow-hidden border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-colors"
                >
                  <Link to={`/blog/${post.slug}`}>
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
                      <span className="px-2 py-1 rounded text-xs font-medium bg-[var(--bg-tertiary)] text-[var(--accent-primary)]">
                        {post.category}
                      </span>

                      <h2 className="mt-3 text-lg font-bold text-[var(--text-primary)] line-clamp-2">
                        {post.title}
                      </h2>

                      <p className="mt-2 text-sm text-[var(--text-secondary)] line-clamp-2">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between mt-4 text-sm text-[var(--text-muted)]">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {formatDate(post.publishedAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {post.readTime}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="flex items-center gap-1 px-2 py-1 text-xs rounded bg-[var(--bg-primary)] text-[var(--text-muted)]"
                          >
                            <Tag size={10} />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-[var(--text-muted)]">No articles found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
