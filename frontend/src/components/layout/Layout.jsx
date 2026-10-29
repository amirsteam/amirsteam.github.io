import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import TopBanner from './TopBanner'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  const { pathname } = useLocation()

  // Each menu item is its own page now: start every new page at the top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[70] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[var(--accent-primary)] focus:text-[var(--accent-contrast)]"
      >
        Skip to content
      </a>
      <TopBanner />
      <Navbar />
      <motion.main
        id="main"
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="flex-grow pt-16 md:pt-28"
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  )
}
