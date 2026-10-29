import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import ProjectsPage from './pages/ProjectsPage'
import ServicesPage from './pages/ServicesPage'
import AboutPage from './pages/AboutPage'
import SkillsPage from './pages/SkillsPage'
import ContactPage from './pages/ContactPage'
import NotFound from './pages/NotFound'
import ErrorBoundary from './components/ErrorBoundary'

// The CMS dashboard loads only when someone opens /admin
const AdminApp = lazy(() => import('./admin/AdminApp'))

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={<p className="p-8 text-sm">Loading dashboard…</p>}>
              <AdminApp />
            </Suspense>
          }
        />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="skills" element={<SkillsPage />} />
          <Route path="contact" element={<ContactPage />} />
          {/* /blog is off until there are real posts (pages/BlogPage.jsx); old links land on the 404 page */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  )
}

export default App
