import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { testimonials as staticTestimonials } from '../../data'
import { normalizeTestimonialArray } from '../../utils/normalizers'

// Testimonials section component with defensive data handling
// Last updated: 2026-01-08
export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [currentIndex, setCurrentIndex] = useState(0)
  // Normalize static data on init
  const [testimonials] = useState(() => normalizeTestimonialArray(staticTestimonials))


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

  // Defensive array check
  const safeTestimonials = Array.isArray(testimonials) ? testimonials : []

  // Ensure currentIndex is valid
  const safeCurrentIndex = safeTestimonials.length > 0 ? currentIndex % safeTestimonials.length : 0
  const currentTestimonial = safeTestimonials[safeCurrentIndex] || {}

  const nextTestimonial = () => {
    if (safeTestimonials.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % safeTestimonials.length)
    }
  }

  const prevTestimonial = () => {
    if (safeTestimonials.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + safeTestimonials.length) % safeTestimonials.length)
    }
  }

  // Don't render if no testimonials
  if (safeTestimonials.length === 0) {
    return null
  }

  return (
    <section id="testimonials" className="py-20 bg-[var(--bg-primary)]">
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
              Testimonials
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              What Clients Say
            </h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              Don't just take my word for it. Here's what my clients and students have to say about working with me.
            </p>
          </motion.div>

          {/* Featured Testimonial */}
          <motion.div variants={itemVariants} className="relative mb-16">
            
            <div className="relative bg-[var(--bg-secondary)] rounded-xl p-8 md:p-12 border border-[var(--border-color)]">
              <Quote className="w-12 h-12 text-[var(--accent-primary)] mb-6" />
              
              <motion.div
                key={safeCurrentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-xl md:text-2xl text-[var(--text-primary)] italic leading-relaxed mb-8">
                  "{currentTestimonial?.content || ''}"
                </p>

                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent-primary)] text-xl font-bold">
                      {(currentTestimonial?.name || 'C').charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--text-primary)]">
                        {currentTestimonial?.name || 'Client'}
                      </h4>
                      <p className="text-sm text-[var(--text-muted)]">
                        {currentTestimonial?.role || 'Role'} at {currentTestimonial?.company || 'Company'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {[...Array(currentTestimonial?.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Navigation */}
              <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 flex items-center gap-2">
                <motion.button
                  onClick={prevTestimonial}
                  className="p-2 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={20} />
                </motion.button>
                <span className="text-sm text-[var(--text-muted)]">
                  {safeCurrentIndex + 1} / {safeTestimonials.length}
                </span>
                <motion.button
                  onClick={nextTestimonial}
                  className="p-2 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={20} />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* All Testimonials Grid */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
            {safeTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial?.id || `testimonial-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl border transition-all ${
                  safeCurrentIndex === index
                    ? 'bg-[var(--bg-secondary)] border-[var(--accent-primary)]'
                    : 'bg-[var(--bg-secondary)] border-[var(--border-color)] hover:border-[var(--accent-primary)]'
                }`}
                onClick={() => setCurrentIndex(index)}
                style={{ cursor: 'pointer' }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent-primary)] font-bold">
                    {(testimonial?.name || 'C').charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--text-primary)]">{testimonial?.name || 'Client'}</h4>
                    <p className="text-sm text-[var(--text-muted)]">
                      {testimonial?.role || 'Role'}, {testimonial?.company || 'Company'}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-[var(--text-secondary)] line-clamp-3 italic">
                  "{testimonial?.content || ''}"
                </p>

                <div className="flex items-center gap-1 mt-4">
                  {[...Array(testimonial?.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
