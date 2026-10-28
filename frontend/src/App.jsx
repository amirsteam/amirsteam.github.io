import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import ContactPage from './pages/ContactPage'
import NotFound from './pages/NotFound'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<ContactPage />} />
            {/* /blog is off until there are real posts (pages/BlogPage.jsx); old links land on the 404 page */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </ErrorBoundary>
  )
}

export default App
