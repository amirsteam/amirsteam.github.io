const mongoose = require('mongoose')

function notFound(req, res) {
  res.status(404).json({ error: `Not found: ${req.method} ${req.originalUrl}` })
}

// Turns errors into short JSON messages the admin form can show next to fields
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, _next) {
  if (err instanceof mongoose.Error.ValidationError) {
    const fields = Object.fromEntries(
      Object.entries(err.errors).map(([path, e]) => [path, e.message])
    )
    return res.status(400).json({ error: 'Please fix the highlighted fields', fields })
  }
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({ error: `Invalid value for ${err.path}` })
  }
  if (err && err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field'
    return res.status(409).json({ error: `That ${field} is already used`, fields: { [field]: 'Already used' } })
  }
  if (err && err.type === 'entity.too.large') {
    return res.status(413).json({ error: 'Request is too large' })
  }
  if (err && err.message === 'Not allowed by CORS') {
    return res.status(403).json({ error: 'Origin not allowed' })
  }

  // Expected errors (like 'publishing not set up') aren't crashes; don't log them as such
  if (!err.expose) console.error(err)
  res.status(err.status || 500).json({ error: err.expose ? err.message : 'Something went wrong on the server' })
}

module.exports = { notFound, errorHandler }
