const express = require('express')
const mongoose = require('mongoose')
const { Message } = require('../models')
const { pickFields } = require('../lib/crud')
const { getPublicContent } = require('../lib/publicContent')

const router = express.Router()

router.get('/health', (req, res) => {
  res.json({ ok: true, db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' })
})

// Used by the deploy workflow at build time (not by visitors' browsers)
router.get('/content', async (req, res) => {
  res.set('Cache-Control', 'no-store')
  res.json(await getPublicContent())
})

// Contact form: saved to the admin inbox
router.post('/contact', async (req, res) => {
  // Honeypot: real people never fill this hidden field
  if (req.body?.website) return res.status(201).json({ ok: true })
  const data = pickFields(Message, req.body)
  delete data.status
  delete data.notes
  await Message.create(data)
  res.status(201).json({ ok: true })
})

module.exports = router
