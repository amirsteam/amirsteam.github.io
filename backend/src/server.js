const env = require('./config/env')
const { connectDB } = require('./config/db')
const { createApp } = require('./app')
const { seedContent, ensureAdmin } = require('./lib/seed')

async function start() {
  if (!env.jwtSecret) throw new Error('JWT_SECRET is not set')
  await connectDB(env.mongoUri)
  console.log('Connected to MongoDB')

  await ensureAdmin()
  if (env.seedOnStart) {
    await seedContent().catch((err) => console.warn('Starter content not loaded:', err.message))
  }

  const app = createApp()
  app.listen(env.port, () => console.log(`API listening on port ${env.port}`))
}

start().catch((err) => {
  console.error('Failed to start:', err.message)
  process.exit(1)
})
