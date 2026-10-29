const { content, Profile } = require('../models')

// Everything the public site needs, published items only, in display order.
// The deploy workflow saves this as frontend/src/data/cms.json.
async function getPublicContent() {
  const out = {}
  for (const [name, Model] of Object.entries(content)) {
    const docs = await Model.find({ isPublished: true }).sort({ order: 1, createdAt: 1 })
    out[name] = docs.map((doc) => {
      const { isPublished: _p, order: _o, createdAt: _c, updatedAt: _u, ...rest } = doc.toJSON()
      return rest
    })
  }
  const profile = await Profile.findOne()
  if (profile) {
    const { createdAt: _c, updatedAt: _u, ...rest } = profile.toJSON()
    out.profile = rest
  }
  out.generatedAt = new Date().toISOString()
  return out
}

module.exports = { getPublicContent }
