const mongoose = require('mongoose')
const { contentFields, trimmed, stringList } = require('./plugins')

function model(name, fields, indexes = []) {
  const schema = new mongoose.Schema(fields)
  contentFields(schema)
  for (const index of indexes) schema.index(index, { unique: true })
  return mongoose.model(name, schema)
}

const Project = model('Project', {
  title: trimmed({ required: [true, 'Title is required'], maxlength: 120 }),
  slug: trimmed({
    required: [true, 'Slug is required'],
    lowercase: true,
    match: [/^[a-z0-9-]+$/, 'Slug can only use a-z, 0-9 and -']
  }),
  category: trimmed({ default: 'Full Stack', maxlength: 40 }),
  description: trimmed({ required: [true, 'Description is required'], maxlength: 400 }),
  problem: trimmed({ maxlength: 400 }),
  solution: trimmed({ maxlength: 500 }),
  techStack: stringList(),
  thumbnail: trimmed(),
  liveUrl: trimmed(),
  githubUrl: trimmed(),
  featured: { type: Boolean, default: false }
}, [{ slug: 1 }])

const Service = model('Service', {
  title: trimmed({ required: [true, 'Title is required'], maxlength: 120 }),
  icon: trimmed({ default: 'Code2' }),
  description: trimmed({ required: [true, 'Description is required'], maxlength: 400 }),
  features: stringList(),
  price: trimmed({ maxlength: 60 }),
  priceNote: trimmed({ maxlength: 120 }),
  popular: { type: Boolean, default: false }
})

// One skill area (a tab on the Skills page)
const Skill = model('Skill', {
  key: trimmed({
    required: [true, 'Key is required'],
    match: [/^[A-Za-z0-9-]+$/, 'Key can only use letters, numbers and -']
  }),
  title: trimmed({ required: [true, 'Title is required'], maxlength: 80 }),
  icon: trimmed({ default: 'Code2' }),
  description: trimmed({ maxlength: 300 }),
  items: stringList(),
  usedIn: stringList()
}, [{ key: 1 }])

const Experience = model('Experience', {
  title: trimmed({ required: [true, 'Job title is required'], maxlength: 120 }),
  company: trimmed({ required: [true, 'Company is required'], maxlength: 120 }),
  location: trimmed({ maxlength: 120 }),
  period: trimmed({ maxlength: 60 }),
  description: trimmed({ maxlength: 600 }),
  achievements: stringList()
})

const Education = model('Education', {
  degree: trimmed({ required: [true, 'Degree is required'], maxlength: 160 }),
  institution: trimmed({ required: [true, 'Institution is required'], maxlength: 160 }),
  location: trimmed({ maxlength: 120 }),
  period: trimmed({ maxlength: 60 }),
  description: trimmed({ maxlength: 600 })
})

const Testimonial = model('Testimonial', {
  name: trimmed({ required: [true, 'Name is required'], maxlength: 80 }),
  role: trimmed({ maxlength: 80 }),
  company: trimmed({ maxlength: 120 }),
  content: trimmed({ required: [true, 'Quote is required'], maxlength: 800 }),
  avatar: trimmed(),
  rating: { type: Number, min: 1, max: 5, default: 5 }
})

// Content types the admin can edit, keyed by their URL name
module.exports = {
  projects: Project,
  services: Service,
  skills: Skill,
  experience: Experience,
  education: Education,
  testimonials: Testimonial
}
