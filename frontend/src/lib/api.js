import {
  normalizeExperienceArray,
  normalizeServiceArray,
  normalizeProjectArray,
  normalizeBlogArray,
  normalizeSkillArray,
  normalizeTestimonialArray,
  normalizeBlog
} from '../utils/normalizers'

const API_URL = import.meta.env.VITE_API_URL || 'https://your-backend.railway.app/api'

/**
 * Safe fetch wrapper - never throws, always returns consistent shape
 */
async function safeFetch(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    })

    if (!response.ok) {
      console.warn(`API ${endpoint} returned ${response.status}`)
      return { success: false, data: null, error: `HTTP ${response.status}` }
    }

    const json = await response.json()

    // Handle various backend response shapes
    const data = json.data || json.results || json.items || json

    return { success: true, data, error: null }
  } catch (error) {
    console.warn(`API ${endpoint} failed:`, error.message)
    return { success: false, data: null, error: error.message }
  }
}

export const api = {
  /**
   * Fetch experience entries - returns normalized, UI-safe array
   */
  async getExperience() {
    const result = await safeFetch('/experience')
    if (result.success && result.data) {
      return {
        ...result,
        data: normalizeExperienceArray(result.data)
      }
    }
    return result
  },

  /**
   * Fetch services - returns normalized, UI-safe array
   */
  async getServices() {
    const result = await safeFetch('/services')
    if (result.success && result.data) {
      return {
        ...result,
        data: normalizeServiceArray(result.data)
      }
    }
    return result
  },

  /**
   * Fetch projects - returns normalized, UI-safe array
   */
  async getProjects() {
    const result = await safeFetch('/projects')
    if (result.success && result.data) {
      return {
        ...result,
        data: normalizeProjectArray(result.data)
      }
    }
    return result
  },

  /**
   * Fetch blog posts - returns normalized, UI-safe array
   */
  async getBlogs() {
    const result = await safeFetch('/blogs')
    if (result.success && result.data) {
      return {
        ...result,
        data: normalizeBlogArray(result.data)
      }
    }
    return result
  },

  /**
   * Fetch single blog by slug
   */
  async getBlogBySlug(slug) {
    const result = await safeFetch(`/blogs/${slug}`)
    if (result.success && result.data) {
      return {
        ...result,
        data: normalizeBlog(result.data)
      }
    }
    return result
  },

  /**
   * Fetch skills - returns normalized, UI-safe array
   */
  async getSkills() {
    const result = await safeFetch('/skills')
    if (result.success && result.data) {
      return {
        ...result,
        data: normalizeSkillArray(result.data)
      }
    }
    return result
  },

  /**
   * Fetch testimonials - returns normalized, UI-safe array
   */
  async getTestimonials() {
    const result = await safeFetch('/testimonials')
    if (result.success && result.data) {
      return {
        ...result,
        data: normalizeTestimonialArray(result.data)
      }
    }
    return result
  },

  /**
   * Submit contact form
   */
  async submitContact(formData) {
    return safeFetch('/contact', {
      method: 'POST',
      body: JSON.stringify(formData)
    })
  }
}

export default api

