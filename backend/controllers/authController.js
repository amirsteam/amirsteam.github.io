const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  })
}

// @desc    Login admin
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      })
    }

    // Check for admin
    const admin = await Admin.findOne({ email }).select('+password')

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      })
    }

    // Check if account is active
    if (!admin.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated'
      })
    }

    // Check password
    const isMatch = await admin.comparePassword(password)

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      })
    }

    // Update last login
    await admin.updateLastLogin()

    // Generate token
    const token = generateToken(admin._id)

    res.status(200).json({
      success: true,
      token,
      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        avatar: admin.avatar
      }
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get current logged in admin
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin.id)

    res.status(200).json({
      success: true,
      data: admin
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update admin profile
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = async (req, res, next) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      email: req.body.email,
      avatar: req.body.avatar
    }

    const admin = await Admin.findByIdAndUpdate(req.admin.id, fieldsToUpdate, {
      new: true,
      runValidators: true
    })

    res.status(200).json({
      success: true,
      data: admin
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update password
// @route   PUT /api/auth/password
// @access  Private
exports.updatePassword = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('+password')

    // Check current password
    if (!(await admin.comparePassword(req.body.currentPassword))) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      })
    }

    admin.password = req.body.newPassword
    await admin.save()

    // Generate new token
    const token = generateToken(admin._id)

    res.status(200).json({
      success: true,
      token,
      message: 'Password updated successfully'
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Register admin (superadmin only or initial setup)
// @route   POST /api/auth/register
// @access  Private/Superadmin
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body

    // Check if any admin exists (for initial setup)
    const adminCount = await Admin.countDocuments()
    
    // If admins exist, only superadmin can create new admins
    if (adminCount > 0 && (!req.admin || req.admin.role !== 'superadmin')) {
      return res.status(403).json({
        success: false,
        message: 'Only superadmin can create new admin accounts'
      })
    }

    // First admin is always superadmin
    const adminRole = adminCount === 0 ? 'superadmin' : (role || 'admin')

    const admin = await Admin.create({
      name,
      email,
      password,
      role: adminRole
    })

    const token = generateToken(admin._id)

    res.status(201).json({
      success: true,
      token,
      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    })
  } catch (error) {
    next(error)
  }
}
