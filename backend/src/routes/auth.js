const express = require('express')
const { Admin } = require('../models')
const { signToken, requireAdmin } = require('../middleware/auth')

const router = express.Router()

const publicAdmin = (a) => ({ id: String(a._id), name: a.name, email: a.email })

router.post('/login', async (req, res) => {
  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : ''
  const password = typeof req.body?.password === 'string' ? req.body.password : ''
  if (!email || !password) return res.status(400).json({ error: 'Enter your email and password' })

  const admin = await Admin.findOne({ email }).select('+password')
  // Same message for unknown email and wrong password
  if (!admin || !admin.isActive || !(await admin.checkPassword(password))) {
    return res.status(401).json({ error: 'Email or password is incorrect' })
  }

  admin.lastLogin = new Date()
  await admin.save()
  res.json({ token: signToken(admin), admin: publicAdmin(admin) })
})

router.get('/me', requireAdmin, (req, res) => {
  res.json({ admin: publicAdmin(req.admin) })
})

router.put('/password', requireAdmin, async (req, res) => {
  const { currentPassword, newPassword } = req.body || {}
  if (typeof newPassword !== 'string' || newPassword.length < 10) {
    return res.status(400).json({ error: 'New password must be at least 10 characters', fields: { newPassword: 'At least 10 characters' } })
  }
  const admin = await req.admin.constructor.findById(req.admin._id).select('+password')
  if (!(await admin.checkPassword(currentPassword || ''))) {
    return res.status(400).json({ error: 'Current password is incorrect', fields: { currentPassword: 'Incorrect' } })
  }
  admin.password = newPassword
  await admin.save()
  res.json({ ok: true })
})

module.exports = router
