const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Helper function for API calls
async function fetchAPI(endpoint) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`)
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error)
    return null
  }
}

// Public API endpoints
export const api = {
  // Projects
  getProjects: () => fetchAPI('/projects'),
  getProject: (slug) => fetchAPI(`/projects/${slug}`),

  // Blogs
  getBlogs: () => fetchAPI('/blogs'),
  getBlog: (slug) => fetchAPI(`/blogs/${slug}`),

  // Skills
  getSkills: () => fetchAPI('/skills'),

  // Services
  getServices: () => fetchAPI('/services'),

  // Experience
  getExperience: () => fetchAPI('/experience'),

  // Testimonials
  getTestimonials: () => fetchAPI('/testimonials'),

  // Contact form
  submitContact: async (data) => {
    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      return await response.json()
    } catch (error) {
      console.error('Error submitting contact:', error)
      return { success: false, message: 'Failed to submit form' }
    }
  },
}

export default api

