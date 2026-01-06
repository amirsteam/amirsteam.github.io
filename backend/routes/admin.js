const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth')

// Project routes
const {
  getAdminProjects,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController')

router.route('/projects')
  .get(protect, getAdminProjects)
  .post(protect, createProject)

router.route('/projects/:id')
  .put(protect, updateProject)
  .delete(protect, deleteProject)

// Blog routes
const {
  getAdminBlogs,
  createBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blogController')

router.route('/blogs')
  .get(protect, getAdminBlogs)
  .post(protect, createBlog)

router.route('/blogs/:id')
  .put(protect, updateBlog)
  .delete(protect, deleteBlog)

// Contact routes
const {
  getContacts,
  getContact,
  updateContact,
  deleteContact,
  getContactStats
} = require('../controllers/contactController')

router.get('/contacts/stats', protect, getContactStats)

router.route('/contacts')
  .get(protect, getContacts)

router.route('/contacts/:id')
  .get(protect, getContact)
  .put(protect, updateContact)
  .delete(protect, deleteContact)

// CRUD routes for other models
const {
  skillController,
  serviceController,
  experienceController,
  testimonialController
} = require('../controllers/crudController')

// Skills
router.route('/skills')
  .get(protect, skillController.getAllAdmin)
  .post(protect, skillController.create)

router.route('/skills/:id')
  .get(protect, skillController.getOne)
  .put(protect, skillController.update)
  .delete(protect, skillController.delete)

// Services
router.route('/services')
  .get(protect, serviceController.getAllAdmin)
  .post(protect, serviceController.create)

router.route('/services/:id')
  .get(protect, serviceController.getOne)
  .put(protect, serviceController.update)
  .delete(protect, serviceController.delete)

// Experience
router.route('/experience')
  .get(protect, experienceController.getAllAdmin)
  .post(protect, experienceController.create)

router.route('/experience/:id')
  .get(protect, experienceController.getOne)
  .put(protect, experienceController.update)
  .delete(protect, experienceController.delete)

// Testimonials
router.route('/testimonials')
  .get(protect, testimonialController.getAllAdmin)
  .post(protect, testimonialController.create)

router.route('/testimonials/:id')
  .get(protect, testimonialController.getOne)
  .put(protect, testimonialController.update)
  .delete(protect, testimonialController.delete)

module.exports = router
