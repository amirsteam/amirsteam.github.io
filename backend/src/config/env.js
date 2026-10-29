require('dotenv').config({ quiet: true })

const list = (value, fallback) =>
  (value || fallback).split(',').map((s) => s.trim()).filter(Boolean)

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGODB_URI || '',
  jwtSecret: process.env.JWT_SECRET || '',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '8h',
  allowedOrigins: list(
    process.env.ALLOWED_ORIGINS,
    'https://www.amirlearner.me,http://localhost:5173,http://localhost:4173'
  ),
  adminEmail: process.env.ADMIN_EMAIL || '',
  adminPassword: process.env.ADMIN_PASSWORD || '',
  githubToken: process.env.GITHUB_TOKEN || '',
  githubRepo: process.env.GITHUB_REPO || 'amirsteam/amirsteam.github.io',
  seedOnStart: (process.env.SEED_ON_START || 'true') !== 'false'
}

// Refuse to run in production with a missing or weak signing secret
if (env.nodeEnv === 'production' && env.jwtSecret.length < 32) {
  throw new Error('JWT_SECRET must be at least 32 characters in production')
}

module.exports = env
