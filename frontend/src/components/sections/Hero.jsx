import { motion } from 'framer-motion'
import { 
  ArrowDown, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail,
  MapPin,
  Sparkles
} from 'lucide-react'
import { personalInfo } from '../../data'

export default function Hero() {
  const socialLinks = [
    { name: 'GitHub', icon: Github, url: personalInfo.social.github },
    { name: 'LinkedIn', icon: Linkedin, url: personalInfo.social.linkedin },
    { name: 'Twitter', icon: Twitter, url: personalInfo.social.twitter }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent dark:from-blue-500/5 dark:via-purple-500/5" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(var(--border-color)_1px,transparent_1px),linear-gradient(90deg,var(--border-color)_1px,transparent_1px)] bg-[size:100px_100px] opacity-20" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Greeting Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] mb-6">
            <Sparkles size={16} className="text-yellow-500" />
            <span className="text-sm text-[var(--text-secondary)]">Available for Freelance & Remote Work</span>
          </motion.div>

          {/* Name */}
          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
            <span className="text-[var(--text-primary)]">Hi, I'm </span>
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {personalInfo.name.split(' ')[0]}
            </span>
          </motion.h1>

          {/* Title */}
          <motion.div variants={itemVariants} className="mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[var(--text-primary)]">
              {personalInfo.title}
            </h2>
          </motion.div>

          {/* Tagline */}
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">
            {personalInfo.tagline}
          </motion.p>

          {/* Location */}
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 text-[var(--text-muted)] mb-8">
            <MapPin size={18} />
            <span>{`${personalInfo.location.city}, ${personalInfo.location.country}`}</span>
            <span className="mx-2">•</span>
            <span className="text-green-500 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              {personalInfo.availability}
            </span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-shadow"
            >
              View My Work
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="px-8 py-4 rounded-xl bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] text-[var(--text-primary)] font-semibold text-lg hover:border-[var(--accent-primary)] transition-colors"
            >
              Get in Touch
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-xl bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
                aria-label={social.name}
              >
                <social.icon size={24} />
              </motion.a>
            ))}
            <motion.a
              href={`mailto:${personalInfo.email}`}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-xl bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
              aria-label="Email"
            >
              <Mail size={24} />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#about"
            variants={floatingVariants}
            animate="animate"
            className="flex flex-col items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors"
          >
            <span className="text-sm">Scroll Down</span>
            <ArrowDown size={20} />
          </motion.a>
        </motion.div>
      </div>

      {/* Floating Tech Icons */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-1/4 left-10 hidden lg:block"
      >
        <div className="p-4 rounded-2xl bg-[var(--bg-secondary)] shadow-lg border border-[var(--border-color)]">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="w-10 h-10" />
        </div>
      </motion.div>

      <motion.div
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '1s' }}
        className="absolute top-1/3 right-10 hidden lg:block"
      >
        <div className="p-4 rounded-2xl bg-[var(--bg-secondary)] shadow-lg border border-[var(--border-color)]">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" className="w-10 h-10" />
        </div>
      </motion.div>

      <motion.div
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '2s' }}
        className="absolute bottom-1/4 left-20 hidden lg:block"
      >
        <div className="p-4 rounded-2xl bg-[var(--bg-secondary)] shadow-lg border border-[var(--border-color)]">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" className="w-10 h-10" />
        </div>
      </motion.div>
    </section>
  )
}
