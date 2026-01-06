import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminUser')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  updatePassword: (data) => api.put('/auth/password', data)
}

// Projects API
export const projectsAPI = {
  getAll: () => api.get('/admin/projects'),
  getOne: (id) => api.get(`/admin/projects/${id}`),
  create: (data) => api.post('/admin/projects', data),
  update: (id, data) => api.put(`/admin/projects/${id}`, data),
  delete: (id) => api.delete(`/admin/projects/${id}`)
}

// Skills API
export const skillsAPI = {
  getAll: () => api.get('/admin/skills'),
  getOne: (id) => api.get(`/admin/skills/${id}`),
  create: (data) => api.post('/admin/skills', data),
  update: (id, data) => api.put(`/admin/skills/${id}`, data),
  delete: (id) => api.delete(`/admin/skills/${id}`)
}

// Services API
export const servicesAPI = {
  getAll: () => api.get('/admin/services'),
  getOne: (id) => api.get(`/admin/services/${id}`),
  create: (data) => api.post('/admin/services', data),
  update: (id, data) => api.put(`/admin/services/${id}`, data),
  delete: (id) => api.delete(`/admin/services/${id}`)
}

// Experience API
export const experienceAPI = {
  getAll: () => api.get('/admin/experience'),
  getOne: (id) => api.get(`/admin/experience/${id}`),
  create: (data) => api.post('/admin/experience', data),
  update: (id, data) => api.put(`/admin/experience/${id}`, data),
  delete: (id) => api.delete(`/admin/experience/${id}`)
}

// Testimonials API
export const testimonialsAPI = {
  getAll: () => api.get('/admin/testimonials'),
  getOne: (id) => api.get(`/admin/testimonials/${id}`),
  create: (data) => api.post('/admin/testimonials', data),
  update: (id, data) => api.put(`/admin/testimonials/${id}`, data),
  delete: (id) => api.delete(`/admin/testimonials/${id}`)
}

// Blogs API
export const blogsAPI = {
  getAll: () => api.get('/admin/blogs'),
  getOne: (id) => api.get(`/admin/blogs/${id}`),
  create: (data) => api.post('/admin/blogs', data),
  update: (id, data) => api.put(`/admin/blogs/${id}`, data),
  delete: (id) => api.delete(`/admin/blogs/${id}`)
}

// Contacts API
export const contactsAPI = {
  getAll: (params) => api.get('/admin/contacts', { params }),
  getOne: (id) => api.get(`/admin/contacts/${id}`),
  getStats: () => api.get('/admin/contacts/stats'),
  update: (id, data) => api.put(`/admin/contacts/${id}`, data),
  delete: (id) => api.delete(`/admin/contacts/${id}`)
}
