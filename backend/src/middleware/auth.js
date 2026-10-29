const jwt = require('jsonwebtoken')
const env = require('../config/env')
const { Admin } = require('../models')

function signToken(admin) {
  return jwt.sign({ sub: String(admin._id) }, env.jwtSecret, { expiresIn: env.jwtExpiresIn })
}

// Requires "Authorization: Bearer <token>" from a signed-in, active admin
async function requireAdmin(req, res, next) {
  const header = req.get('authorization') || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : ''
  if (!token) return res.status(401).json({ error: 'Please sign in' })

  try {
    const payload = jwt.verify(token, env.jwtSecret)
    const admin = await Admin.findById(payload.sub)
    if (!admin || !admin.isActive) return res.status(401).json({ error: 'Please sign in' })
    req.admin = admin
    next()
  } catch {
    return res.status(401).json({ error: 'Your session has expired, please sign in again' })
  }
}

module.exports = { signToken, requireAdmin }
