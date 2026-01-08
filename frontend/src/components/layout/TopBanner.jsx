import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, Sparkles } from 'lucide-react'

// Contact information
const CONTACT_INFO = {
  email: 'amirsvi766@gmail.com',
  phone: '+9779861158271',
  phoneDisplay: '+977 986-115-8271',
  whatsappUrl: 'https://wa.me/9779861158271',
  viberUrl: 'viber://chat?number=9779861158271',
}

// Viber SVG Icon component
const ViberIcon = ({ size = 16, className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    fill="currentColor"
  >
    <path d="M11.398 0C9.974.013 5.606.232 3.395 2.263 1.747 3.907 1.14 6.342 1.076 9.345c-.063 3.002-.142 8.634 5.289 10.196l.007.003v2.349s-.038.949.59 1.143c.759.235 1.206-.489 1.933-1.268l1.356-1.532c3.723.312 6.586-.403 6.91-.503.747-.232 4.976-.783 5.664-6.39.71-5.787-.343-9.439-2.205-11.058l-.003-.003C19.503.46 15.769.002 12.593 0h-1.195zm.561 1.551c2.866.023 6.202.382 7.857 1.857 1.471 1.323 2.362 4.503 1.751 9.465-.564 4.588-3.921 5.083-4.547 5.277-.27.084-2.755.702-5.914.503 0 0-2.341 2.827-3.073 3.563-.114.116-.252.162-.343.14-.128-.03-.164-.178-.162-.393l.024-3.862v-.003c-4.632-1.3-4.36-6.028-4.308-8.591.053-2.564.543-4.655 1.906-6.003C6.501 2.02 9.089 1.526 11.959 1.55zm.166 2.315a.454.454 0 0 0-.324.136.444.444 0 0 0-.003.631.451.451 0 0 0 .322.133c1.376.011 2.567.492 3.542 1.433.976.941 1.524 2.209 1.633 3.77a.45.45 0 0 0 .478.42.448.448 0 0 0 .42-.478c-.126-1.795-.773-3.27-1.927-4.382-1.152-1.111-2.552-1.676-4.163-1.684a.506.506 0 0 0-.053 0h.075zm-2.382.713c-.164-.003-.34.04-.514.136l-.018.009c-.428.234-.82.527-1.148.894-.264.308-.41.619-.437.928-.018.21.024.42.118.621l.01.016c.259.555.588 1.084.976 1.584.578.77 1.262 1.47 2.04 2.088l.027.024.025.021.019.018.022.017c.619.777 1.32 1.46 2.091 2.04.5.388 1.027.716 1.584.974l.015.01c.202.095.41.137.621.118.309-.027.62-.173.928-.437.368-.328.66-.72.895-1.147l.01-.02c.21-.392.225-.8.03-1.103a1.23 1.23 0 0 0-.203-.235L14.79 9.925c-.389-.335-.85-.373-1.203-.095l-.009.007-.618.512c-.263.203-.63.18-.876.066l-.009-.003a5.167 5.167 0 0 1-1.076-.676 5.294 5.294 0 0 1-.867-.91 5.163 5.163 0 0 1-.476-.829l-.004-.011a.718.718 0 0 1 .067-.875l.512-.617.006-.01c.279-.353.241-.814-.094-1.202l-1.334-1.524a1.23 1.23 0 0 0-.236-.203.84.84 0 0 0-.507-.145h.002zm2.597.595a.449.449 0 0 0-.095.89c.864.183 1.554.561 2.052 1.127.5.566.8 1.295.894 2.168a.45.45 0 0 0 .5.394.449.449 0 0 0 .394-.5c-.114-1.057-.489-1.948-1.116-2.658-.629-.711-1.473-1.18-2.514-1.4a.444.444 0 0 0-.115-.02zm.23 1.71a.45.45 0 0 0-.102.89c.418.096.72.28.921.53.202.25.319.564.358.95a.449.449 0 1 0 .893-.098c-.055-.549-.227-1.03-.541-1.42-.315-.39-.754-.663-1.319-.802a.563.563 0 0 0-.21-.05z"/>
  </svg>
)

// WhatsApp SVG Icon component
const WhatsAppIcon = ({ size = 16, className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

export default function TopBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Hide banner on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const iconButtonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.15,
      transition: { type: 'spring', stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  }

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }

  const shimmerAnimation = {
    backgroundPosition: ['200% 0', '-200% 0'],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'linear'
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-purple-500/20"
        >
          {/* Animated background shimmer */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
            style={{ backgroundSize: '200% 100%' }}
            animate={shimmerAnimation}
          />

          {/* Sparkle effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-1 left-[10%] text-yellow-400/60"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles size={10} />
            </motion.div>
            <motion.div
              className="absolute top-2 right-[15%] text-blue-400/60"
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.3, 1],
                rotate: [0, -180, -360]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <Sparkles size={8} />
            </motion.div>
          </div>

          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-9 md:h-10 text-xs md:text-sm">

              {/* Left - Email with animation */}
              <motion.a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
                whileHover={{ x: 3 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <motion.div
                  className="relative"
                  animate={isHovered ? {} : pulseAnimation}
                >
                  <Mail size={14} className="text-purple-400 group-hover:text-purple-300" />
                  {/* Ping effect */}
                  <motion.span
                    className="absolute inset-0 rounded-full bg-purple-400"
                    animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.div>
                <span className="hidden sm:inline font-medium tracking-wide">
                  {CONTACT_INFO.email}
                </span>
                <span className="sm:hidden font-medium">Email</span>
              </motion.a>

              {/* Center - Availability badge (hidden on mobile) */}
              <motion.div
                className="hidden md:flex items-center gap-2 text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.span
                  className="relative flex h-2 w-2"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </motion.span>
                <span className="text-green-400 font-medium">Available for Projects</span>
              </motion.div>

              {/* Right - Phone with WhatsApp & Viber */}
              <div className="flex items-center gap-1 sm:gap-3">
                {/* Phone number (hidden on small mobile) */}
                <motion.a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="hidden sm:flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
                  whileHover={{ x: -3 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <motion.div animate={isHovered ? {} : pulseAnimation}>
                    <Phone size={14} className="text-green-400 group-hover:text-green-300" />
                  </motion.div>
                  <span className="font-medium tracking-wide">{CONTACT_INFO.phoneDisplay}</span>
                </motion.a>

                {/* Divider */}
                <span className="hidden sm:block w-px h-4 bg-gray-600"></span>

                {/* Action buttons */}
                <div className="flex items-center gap-1">
                  {/* WhatsApp */}
                  <motion.a
                    href={CONTACT_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={iconButtonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    className="relative flex items-center gap-1.5 px-2 py-1.5 rounded-full bg-green-500/20 hover:bg-green-500/30 text-green-400 hover:text-green-300 transition-colors group"
                    title="Chat on WhatsApp"
                  >
                    <WhatsAppIcon size={14} />
                    <span className="hidden lg:inline text-xs font-medium">WhatsApp</span>
                    {/* Glow effect */}
                    <motion.span
                      className="absolute inset-0 rounded-full bg-green-400/20 blur-md"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                  </motion.a>

                  {/* Viber */}
                  <motion.a
                    href={CONTACT_INFO.viberUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={iconButtonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    className="relative flex items-center gap-1.5 px-2 py-1.5 rounded-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 hover:text-purple-300 transition-colors group"
                    title="Chat on Viber"
                  >
                    <ViberIcon size={14} />
                    <span className="hidden lg:inline text-xs font-medium">Viber</span>
                    {/* Glow effect */}
                    <motion.span
                      className="absolute inset-0 rounded-full bg-purple-400/20 blur-md"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                  </motion.a>

                  {/* Call button (mobile only) */}
                  <motion.a
                    href={`tel:${CONTACT_INFO.phone}`}
                    variants={iconButtonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    className="sm:hidden relative flex items-center gap-1.5 px-2 py-1.5 rounded-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 hover:text-blue-300 transition-colors"
                    title="Call Now"
                  >
                    <Phone size={14} />
                  </motion.a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom gradient line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"
            animate={{
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

