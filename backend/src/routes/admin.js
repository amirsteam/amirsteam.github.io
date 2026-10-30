const express = require('express')
const { content, Profile, Message, SiteState, touchSiteState } = require('../models')
const { requireAdmin } = require('../middleware/auth')
const { crudRouter, pickFields, validId } = require('../lib/crud')
const { triggerPublish } = require('../lib/github')

const router = express.Router()
router.use(requireAdmin)

// Counts for the dashboard
router.get('/summary', async (req, res) => {
  const counts = {}
  for (const [name, Model] of Object.entries(content)) {
    counts[name] = await Model.countDocuments()
  }
  counts.newMessages = await Message.countDocuments({ status: 'new' })
  counts.messages = await Message.countDocuments()
  const state = await SiteState.findOne().lean()
  res.json({
    counts,
    contentUpdatedAt: state?.contentUpdatedAt || null,
    publishRequestedAt: state?.publishRequestedAt || null
  })
})

// Profile (single document)
router.get('/profile', async (req, res) => {
  res.json({ item: await Profile.findOne() })
})

router.put('/profile', async (req, res) => {
  let profile = await Profile.findOne()
  if (!profile) profile = new Profile()
  profile.set(pickFields(Profile, req.body))
  await profile.save()
  await touchSiteState('contentUpdatedAt')
  res.json({ item: profile })
})

// Content collections: /api/admin/projects, /services, /skills, ...
for (const [name, Model] of Object.entries(content)) {
  router.use(`/${name}`, crudRouter(Model))
}

// Inbox
router.get('/messages', async (req, res) => {
  const filter = ['new', 'read', 'replied', 'archived'].includes(req.query.status)
    ? { status: req.query.status }
    : {}
  const items = await Message.find(filter).sort({ createdAt: -1 }).limit(500)
  res.json({ items })
})

router.put('/messages/:id', validId, async (req, res) => {
  const item = await Message.findById(req.params.id)
  if (!item) return res.status(404).json({ error: 'Not found' })
  const { status, notes } = req.body || {}
  if (status !== undefined) item.status = status
  if (notes !== undefined) item.notes = notes
  await item.save()
  res.json({ item })
})

router.delete('/messages/:id', validId, async (req, res) => {
  const item = await Message.findByIdAndDelete(req.params.id)
  if (!item) return res.status(404).json({ error: 'Not found' })
  res.status(204).end()
})

// Rebuild the public site with the latest content
router.post('/publish', async (req, res) => {
  const result = await triggerPublish()
  await touchSiteState('publishRequestedAt')
  res.status(202).json({ ok: true, ...result })
})

module.exports = router
