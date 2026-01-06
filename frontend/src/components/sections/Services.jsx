import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { School, ShoppingCart, Newspaper, Check, ArrowRight } from 'lucide-react'
import { services } from '../../data'

const iconMap = {
  School,
  ShoppingCart,
  Newspaper
}

export default function Services() {
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
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-sm font-semibold text-[var(--accent-primary)] uppercase tracking-wider">
              What I Offer
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
              Solutions & Packages
            </h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Complete digital solutions tailored to your needs. All packages are customizable to fit your specific requirements.
            </p>
            <div className="mt-4 w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
          </motion.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon]
              return (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className={`relative rounded-2xl overflow-hidden ${
                    service.popular
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600 p-[2px]'
                      : ''
                  }`}
                >
                  {service.popular && (
                    <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-white text-purple-600 text-xs font-bold">
                      Most Popular
                    </div>
                  )}
                  
                  <div className={`h-full bg-[var(--bg-secondary)] rounded-2xl ${service.popular ? '' : 'border border-[var(--border-color)]'} p-8`}>
                    {/* Icon */}
                    <div className={`inline-flex p-4 rounded-2xl ${
                      service.popular
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600'
                        : 'bg-[var(--bg-tertiary)]'
                    }`}>
                      <IconComponent className={`w-8 h-8 ${service.popular ? 'text-white' : 'text-[var(--accent-primary)]'}`} />
                    </div>

                    {/* Title & Description */}
                    <h3 className="mt-6 text-xl font-bold text-[var(--text-primary)]">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-[var(--text-secondary)]">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="mt-6 space-y-3">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className={`flex-shrink-0 p-1 rounded-full ${
                            service.popular
                              ? 'bg-green-500/20 text-green-500'
                              : 'bg-[var(--bg-tertiary)] text-[var(--accent-primary)]'
                          }`}>
                            <Check size={14} />
                          </div>
                          <span className="text-sm text-[var(--text-secondary)]">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Price */}
                    <div className="mt-8 pt-8 border-t border-[var(--border-color)]">
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm text-[var(--text-muted)]">{service.priceNote}</span>
                      </div>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-3xl font-bold text-[var(--text-primary)]">{service.price}</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <motion.a
                      href="#contact"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                        service.popular
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25'
                          : 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] hover:bg-[var(--accent-primary)] hover:text-white'
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
            className="mt-16 text-center p-8 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-[var(--border-color)]"
          >
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto mb-6">
              Every project is unique. Let's discuss your specific requirements and create a tailored solution that perfectly fits your needs and budget.
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-shadow"
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
