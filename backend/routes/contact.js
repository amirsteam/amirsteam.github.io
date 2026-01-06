const express = require('express')
const router = express.Router()
const { createContact } = require('../controllers/contactController')
const { body, validationResult } = require('express-validator')

// Validation middleware
const validateContact = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('subject').isIn(['project', 'consultation', 'teaching', 'job', 'other']).withMessage('Invalid subject'),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 2000 }).withMessage('Message too long'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      })
    }
    next()
  }
]

router.post('/', validateContact, createContact)

module.exports = router
