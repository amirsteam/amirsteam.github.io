const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const env = require('./config/env')
const { notFound, errorHandler } = require('./middleware/errors')

const limiter = (windowMinutes, max, message) => rateLimit({
  windowMs: windowMinutes * 60 * 1000,
  limit: max,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { error: message }
})

function createApp() {
  const app = express()

  // Render sits behind one proxy; needed for correct client IPs in rate limits
  app.set('trust proxy', 1)
  app.disable('x-powered-by')

  app.use(helmet())
  app.use(cors({
    origin(origin, callback) {
      // No Origin header: server-to-server calls (deploy workflow, health checks)
      if (!origin || env.allowedOrigins.includes(origin)) return callback(null, true)
      callback(new Error('Not allowed by CORS'))
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 600
  }))
  app.use(express.json({ limit: '100kb' }))

  app.use('/api', limiter(15, 600, 'Too many requests, please try again later'))
  app.use('/api/auth/login', limiter(15, 10, 'Too many sign-in attempts, please wait 15 minutes'))
  app.use('/api/contact', limiter(60, 5, 'Too many messages from this connection, please try again later'))
  app.use('/api/admin/publish', limiter(60, 20, 'Too many publish requests, please wait a bit'))

  app.use('/api', require('./routes/public'))
  app.use('/api/auth', require('./routes/auth'))
  app.use('/api/admin', require('./routes/admin'))

  app.use(notFound)
  app.use(errorHandler)
  return app
}

module.exports = { createApp }
