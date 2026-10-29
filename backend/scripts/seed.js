// Load starter content into the database in MONGODB_URI and create the first
// admin (ADMIN_EMAIL / ADMIN_PASSWORD). Safe to run again: it never overwrites.
//   npm run seed
const mongoose = require('mongoose')
const env = require('../src/config/env')
const { connectDB } = require('../src/config/db')
const { seedContent, ensureAdmin } = require('../src/lib/seed')

async function main() {
  await connectDB(env.mongoUri)
  await ensureAdmin()
  const filled = await seedContent()
  if (!filled.length) console.log('Nothing to seed: every collection already has content')
  await mongoose.disconnect()
}

main().catch(async (err) => {
  console.error(err.message)
  await mongoose.disconnect()
  process.exit(1)
})
