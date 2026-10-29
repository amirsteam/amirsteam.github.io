const express = require('express')
const mongoose = require('mongoose')

// Fields the admin can never set directly
const PROTECTED = new Set(['_id', 'id', '__v', 'createdAt', 'updatedAt'])

// Keep only fields the model defines, so unknown input is ignored
function pickFields(Model, body) {
  const out = {}
  if (!body || typeof body !== 'object') return out
  for (const [key, value] of Object.entries(body)) {
    if (PROTECTED.has(key)) continue
    if (Model.schema.path(key) || Model.schema.nested[key]) out[key] = value
  }
  return out
}

function validId(req, res, next) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(404).json({ error: 'Not found' })
  }
  next()
}

// List / create / read / update / delete for one content model (admin only)
function crudRouter(Model) {
  const router = express.Router()

  router.get('/', async (req, res) => {
    const items = await Model.find().sort({ order: 1, createdAt: 1 })
    res.json({ items })
  })

  router.post('/', async (req, res) => {
    const data = pickFields(Model, req.body)
    if (data.order === undefined) {
      const last = await Model.findOne().sort({ order: -1 }).select('order')
      data.order = last ? last.order + 1 : 0
    }
    const item = await Model.create(data)
    res.status(201).json({ item })
  })

  router.get('/:id', validId, async (req, res) => {
    const item = await Model.findById(req.params.id)
    if (!item) return res.status(404).json({ error: 'Not found' })
    res.json({ item })
  })

  router.put('/:id', validId, async (req, res) => {
    const item = await Model.findById(req.params.id)
    if (!item) return res.status(404).json({ error: 'Not found' })
    item.set(pickFields(Model, req.body))
    await item.save()
    res.json({ item })
  })

  router.delete('/:id', validId, async (req, res) => {
    const item = await Model.findByIdAndDelete(req.params.id)
    if (!item) return res.status(404).json({ error: 'Not found' })
    res.status(204).end()
  })

  return router
}

module.exports = { crudRouter, pickFields, validId }
