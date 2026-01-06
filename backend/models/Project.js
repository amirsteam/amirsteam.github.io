const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Full Stack', 'Frontend', 'Backend', 'Web Development', 'Mobile App']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  problem: {
    type: String,
    required: [true, 'Problem statement is required']
  },
  solution: {
    type: String,
    required: [true, 'Solution description is required']
  },
  techStack: [{
    type: String,
    required: true
  }],
  thumbnail: {
    type: String,
    default: ''
  },
  videoPreview: {
    type: String,
    default: ''
  },
  images: [{
    type: String
  }],
  liveUrl: {
    type: String,
    default: ''
  },
  githubUrl: {
    type: String,
    default: ''
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  isPublished: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

// Generate slug from title
projectSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-')
  }
  next()
})

module.exports = mongoose.model('Project', projectSchema)
