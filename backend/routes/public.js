const express = require('express')
const router = express.Router()
const { skillController, serviceController, experienceController, testimonialController } = require('../controllers/crudController')

// Skills
router.get('/skills', skillController.getAll)

// Services
router.get('/services', serviceController.getAll)

// Experience
router.get('/experience', experienceController.getAll)

// Testimonials
router.get('/testimonials', testimonialController.getAll)

module.exports = router
