import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { School, ShoppingCart, Newspaper, Check, ArrowRight, Briefcase } from 'lucide-react'
import { services as staticServices } from '../../data'
import { normalizeServiceArray } from '../../utils/normalizers'

const iconMap = {
  School,
  ShoppingCart,
  Newspaper,
  Briefcase
}

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  // Normalize static data on init
  const [services] = useState(() => normalizeServiceArray(staticServices))


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
  const safeServices = Array.isArray(services) ? services : []

  return (
    <section id="services" className="py-20 bg-[var(--bg-primary)]">
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
              What I Offer
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              Solutions & Packages
            </h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              Complete digital solutions tailored to your needs. All packages are customizable to fit your specific requirements.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {safeServices.map((service, index) => {
              const IconComponent = iconMap[service?.icon] || Briefcase
              const safeFeatures = Array.isArray(service?.features) ? service.features : []
              return (
                <motion.div
                  key={service?.id || `service-${index}`}
                  variants={itemVariants}
                  className="relative rounded-xl overflow-hidden"
                >
                  {service?.popular && (
                    <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-md bg-[var(--accent-primary)] text-[var(--accent-contrast)] text-xs font-semibold">
                      Most Popular
                    </div>
                  )}
                  
                  <div className={`h-full bg-[var(--bg-secondary)] rounded-xl ${service?.popular ? 'border-2 border-[var(--accent-primary)]' : 'border border-[var(--border-color)]'} p-8`}>
                    {/* Icon */}
                    <div className="inline-flex p-3 rounded-lg bg-[var(--accent-soft)]">
                      <IconComponent className="w-6 h-6 text-[var(--accent-primary)]" aria-hidden="true" />
                    </div>

                    {/* Title & Description */}
                    <h3 className="mt-6 text-xl font-bold text-[var(--text-primary)]">
                      {service?.title || 'Service'}
                    </h3>
                    <p className="mt-2 text-[var(--text-secondary)]">
                      {service?.description || ''}
                    </p>

                    {/* Features - defensive rendering */}
                    <ul className="mt-6 space-y-3">
                      {safeFeatures.map((feature, i) => (
                        <li key={`${service?.id || index}-feature-${i}`} className="flex items-start gap-3">
                          <div className={`flex-shrink-0 p-1 rounded-full ${
                            service?.popular
                              ? 'bg-green-500/20 text-green-700 dark:text-green-400'
                              : 'bg-[var(--bg-tertiary)] text-[var(--accent-primary)]'
                          }`}>
                            <Check size={14} />
                          </div>
                          <span className="text-sm text-[var(--text-secondary)]">
                            {typeof feature === 'string' ? feature : String(feature)}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Price */}
                    <div className="mt-8 pt-8 border-t border-[var(--border-color)]">
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm text-[var(--text-muted)]">{service?.priceNote || 'Starting from'}</span>
                      </div>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-3xl font-bold text-[var(--text-primary)]">{service?.price || 'Contact'}</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <motion.a
                      href="#contact"
                      className={`mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                        service?.popular
                          ? 'bg-[var(--accent-primary)] text-[var(--accent-contrast)] hover:bg-[var(--accent-hover)]'
                          : 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--accent-primary)]'
                      }`}
                    >
                      Get Started
                      <ArrowRight size={18} />
                    </motion.a>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Custom Solution CTA */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center p-8 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)]"
          >
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto mb-6">
              Every project is unique. Let's discuss your specific requirements and create a tailored solution that perfectly fits your needs and budget.
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--accent-primary)] text-[var(--accent-contrast)] hover:bg-[var(--accent-hover)] font-semibold transition-colors"
            >
              Let's Discuss Your Project
              <ArrowRight size={20} />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
