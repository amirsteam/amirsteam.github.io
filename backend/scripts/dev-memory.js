// Run the API locally with a throwaway in-memory MongoDB (no Atlas needed).
// Data disappears when you stop it.
//   npm run dev:memory
// Sign in at http://localhost:5173/admin with the email and password printed below.
const { MongoMemoryServer } = require('mongodb-memory-server')

async function main() {
  const mongo = await MongoMemoryServer.create()
  process.env.MONGODB_URI = mongo.getUri('portfolio')
  process.env.JWT_SECRET ||= 'local-development-secret-not-for-production'
  process.env.ADMIN_EMAIL ||= 'admin@localhost.test'
  process.env.ADMIN_PASSWORD ||= 'local-admin-pass'
  console.log(`In-memory MongoDB ready. Local admin: ${process.env.ADMIN_EMAIL} / ${process.env.ADMIN_PASSWORD}`)

  require('../src/server')

  const stop = async () => { await mongo.stop(); process.exit(0) }
  process.on('SIGINT', stop)
  process.on('SIGTERM', stop)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
