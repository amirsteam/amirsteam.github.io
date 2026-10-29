const mongoose = require('mongoose')

// Strip $-operators from query filters built from user input (NoSQL injection guard)
mongoose.set('sanitizeFilter', true)
mongoose.set('strictQuery', true)

async function connectDB(uri) {
  if (!uri) throw new Error('MONGODB_URI is not set')
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 15000 })
  return mongoose.connection
}

module.exports = { connectDB }
