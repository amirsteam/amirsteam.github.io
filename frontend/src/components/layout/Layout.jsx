import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import TopBanner from './TopBanner'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBanner />
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-grow pt-24 md:pt-28"
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  )
}
