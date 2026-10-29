import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, Download, ChevronDown, Phone, MessageCircle } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { navLinks, personalInfo } from '../../data'
import { cn } from '../../utils/helpers'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close the mobile menu when a link is used (instead of an effect on location)
  const handleNavClick = (e, path) => {
    e.preventDefault()
    setIsOpen(false)
    if (path.includes('#')) {
      const [basePath, hash] = path.split('#')
      if (location.pathname !== '/' && basePath === '/') {
        navigate('/')
        setTimeout(() => {
          const element = document.getElementById(hash)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }, 100)
      } else {
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    } else {
      navigate(path)
    }
  }

  return (
    <header
      className={cn(
        'fixed top-0 md:top-10 left-0 right-0 z-50 transition-all duration-300',
        'bg-[var(--bg-primary)] border-b border-[var(--border-color)]',
        (scrolled || isOpen) && 'shadow-sm'
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center space-x-2 group">
            <motion.div
              className="flex items-center"
            >
              <span className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                Amir
              </span>
              <span className="text-2xl font-bold text-[var(--accent-primary)]">.</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={(e) => handleNavClick(e, link.path)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  'hover:bg-[var(--bg-secondary)] hover:text-[var(--accent-primary)]',
                  location.pathname === link.path
                    ? 'text-[var(--accent-primary)]'
                    : 'text-[var(--text-secondary)]'
                )}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                  <motion.div
                    key="sun"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Resume Download - Hidden on mobile */}
            <motion.a
              href="/resume.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--accent-primary)] text-[var(--accent-contrast)] hover:bg-[var(--accent-hover)] font-medium text-sm transition-colors"
            >
              <Download size={16} />
              <span>Resume</span>
            </motion.a>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-[var(--bg-secondary)] text-[var(--text-secondary)]"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden absolute top-full left-0 right-0 bg-[var(--bg-primary)] border-b border-[var(--border-color)] shadow-lg"
            >
              <div className="py-4 space-y-2 px-4">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.path}
                    onClick={(e) => handleNavClick(e, link.path)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className={cn(
                      'block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                      'hover:bg-[var(--bg-secondary)] hover:text-[var(--accent-primary)]',
                      location.pathname === link.path
                        ? 'bg-[var(--bg-secondary)] text-[var(--accent-primary)]'
                        : 'text-[var(--text-secondary)]'
                    )}
                  >
                    {link.name}
                  </motion.a>
                ))}
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.03 }}
                  href="/resume.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 rounded-lg bg-[var(--accent-primary)] text-[var(--accent-contrast)] hover:bg-[var(--accent-hover)] font-medium text-sm"
                >
                  <Download size={16} />
                  <span>View Resume</span>
                </motion.a>

                {/* Quick contact (the top contact banner is hidden on phones) */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <a
                    href={`https://wa.me/${personalInfo.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-[var(--border-color)] text-[var(--text-primary)] font-medium text-sm"
                  >
                    <MessageCircle size={16} aria-hidden="true" />
                    WhatsApp
                  </a>
                  <a
                    href={`tel:${personalInfo.phone.replace(/\s/g, '')}`}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-[var(--border-color)] text-[var(--text-primary)] font-medium text-sm"
                  >
                    <Phone size={16} aria-hidden="true" />
                    Call
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
