const path = require('node:path')
const { pathToFileURL } = require('node:url')
const { content, Profile, Admin } = require('../models')
const env = require('../config/env')

// The site's built-in content lives in the frontend; reuse it as starter data
const DEFAULTS_FILE = path.resolve(__dirname, '../../../frontend/src/data/defaults.js')

const withoutId = ({ id: _id, ...rest }) => rest
const withOrder = (list) => list.map((item, order) => ({ ...withoutId(item), order }))

async function loadDefaults(file = DEFAULTS_FILE) {
  return import(pathToFileURL(file).href)
}

// Shape the frontend's defaults.js into documents for each collection
function toDocuments(d) {
  return {
    profile: { ...d.personalInfo, stats: d.stats || [] },
    projects: withOrder(d.projects || []),
    services: withOrder(d.services || []),
    skills: Object.entries(d.skills || {}).map(([key, s], order) => ({
      key,
      title: s.title,
      icon: s.icon,
      description: s.description,
      items: (s.items || []).map((i) => (typeof i === 'string' ? i : i.name)),
      usedIn: s.usedIn || [],
      order
    })),
    experience: withOrder(d.experience || []),
    education: withOrder(d.education || []),
    testimonials: withOrder(d.testimonials || [])
  }
}

// Fill empty collections with the starter content. Never overwrites anything.
async function seedContent({ defaults, log = console.log } = {}) {
  const docs = toDocuments(defaults || (await loadDefaults()))
  const filled = []

  if (!(await Profile.exists({}))) {
    await Profile.create(docs.profile)
    filled.push('profile')
  }
  for (const [name, Model] of Object.entries(content)) {
    if ((await Model.estimatedDocumentCount()) === 0 && docs[name].length) {
      await Model.insertMany(docs[name])
      filled.push(`${name} (${docs[name].length})`)
    }
  }
  if (filled.length) log(`Seeded starter content: ${filled.join(', ')}`)
  return filled
}

// Create the first admin from ADMIN_EMAIL / ADMIN_PASSWORD when none exists
async function ensureAdmin({ email = env.adminEmail, password = env.adminPassword, log = console.log } = {}) {
  if (await Admin.exists({})) return null
  if (!email || !password) {
    log('No admin account yet: set ADMIN_EMAIL and ADMIN_PASSWORD to create one')
    return null
  }
  if (password.length < 10) throw new Error('ADMIN_PASSWORD must be at least 10 characters')
  const admin = await Admin.create({ email, password, name: 'Amir' })
  log(`Created admin account for ${admin.email}`)
  return admin
}

module.exports = { seedContent, ensureAdmin, toDocuments, loadDefaults, DEFAULTS_FILE }
