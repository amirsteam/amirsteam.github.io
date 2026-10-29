const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { trimmed, stringList } = require('./plugins')
const content = require('./content')

const hideId = { versionKey: false, transform: (_d, ret) => { delete ret._id; return ret } }
const withId = {
  versionKey: false,
  transform: (_d, ret) => { ret.id = String(ret._id); delete ret._id; return ret }
}

// Single document: name, contact details, bio and About-page stats
const Profile = mongoose.model('Profile', new mongoose.Schema({
  name: trimmed({ required: true, maxlength: 80 }),
  title: trimmed({ maxlength: 120 }),
  tagline: trimmed({ maxlength: 200 }),
  email: trimmed({ lowercase: true }),
  phone: trimmed({ maxlength: 30 }),
  location: { city: trimmed(), district: trimmed(), province: trimmed(), country: trimmed() },
  availability: trimmed({ maxlength: 60 }),
  primaryGoals: stringList(),
  social: { github: trimmed(), linkedin: trimmed(), twitter: trimmed(), youtube: trimmed() },
  bio: trimmed({ maxlength: 4000 }),
  stats: {
    type: [{ value: trimmed({ maxlength: 12 }), label: trimmed({ maxlength: 40 }), _id: false }],
    default: []
  }
}, { timestamps: true, toJSON: hideId }))

// Contact form messages, shown in the admin inbox
const Message = mongoose.model('Message', new mongoose.Schema({
  name: trimmed({ required: [true, 'Name is required'], maxlength: 100 }),
  email: trimmed({
    required: [true, 'Email is required'],
    lowercase: true,
    maxlength: 200,
    match: [/^\S+@\S+\.\S+$/, 'Email looks invalid']
  }),
  phone: trimmed({ maxlength: 30 }),
  subject: { type: String, enum: ['project', 'consultation', 'teaching', 'job', 'other'], default: 'other' },
  message: trimmed({ required: [true, 'Message is required'], maxlength: 2000 }),
  status: { type: String, enum: ['new', 'read', 'replied', 'archived'], default: 'new' },
  notes: trimmed({ maxlength: 2000 })
}, { timestamps: true, toJSON: withId }))

const adminSchema = new mongoose.Schema({
  name: { type: String, trim: true, default: 'Admin' },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 10, select: false },
  isActive: { type: Boolean, default: true },
  lastLogin: Date
}, { timestamps: true, toJSON: withId })

adminSchema.pre('save', async function hashPassword() {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 12)
})

adminSchema.methods.checkPassword = function checkPassword(candidate) {
  return bcrypt.compare(String(candidate), this.password)
}

const Admin = mongoose.model('Admin', adminSchema)

module.exports = { content, Profile, Message, Admin }
