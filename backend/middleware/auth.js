const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')

const protect = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get admin from token
      req.admin = await Admin.findById(decoded.id).select('-password')

      if (!req.admin) {
        return res.status(401).json({
          success: false,
          message: 'Not authorized - admin not found'
        })
      }

      if (!req.admin.isActive) {
        return res.status(401).json({
          success: false,
          message: 'Account is deactivated'
        })
      }

      next()
    } catch (error) {
      console.error('Auth error:', error.message)
      return res.status(401).json({
        success: false,
        message: 'Not authorized - token invalid'
      })
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized - no token provided'
    })
  }
}

const superAdminOnly = (req, res, next) => {
  if (req.admin && req.admin.role === 'superadmin') {
    next()
  } else {
    return res.status(403).json({
      success: false,
      message: 'Access denied - superadmin only'
    })
  }
}

module.exports = { protect, superAdminOnly }
