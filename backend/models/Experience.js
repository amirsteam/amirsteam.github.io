const mongoose = require('mongoose')

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  period: {
    type: String,
    required: [true, 'Period is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  achievements: [{
    type: String
  }],
  type: {
    type: String,
    enum: ['experience', 'education'],
    default: 'experience'
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

module.exports = mongoose.model('Experience', experienceSchema)
