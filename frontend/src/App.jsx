import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import ContactPage from './pages/ContactPage'
import BlogPage from './pages/BlogPage'

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="blog" element={<BlogPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default App
