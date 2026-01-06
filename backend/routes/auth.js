const express = require('express')
const router = express.Router()
const {
  login,
  register,
  getMe,
  updateProfile,
  updatePassword
} = require('../controllers/authController')
const { protect } = require('../middleware/auth')

router.post('/login', login)
router.post('/register', register)

// Protected routes
router.get('/me', protect, getMe)
router.put('/profile', protect, updateProfile)
router.put('/password', protect, updatePassword)

module.exports = router
