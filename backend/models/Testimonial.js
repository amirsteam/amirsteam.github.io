const mongoose = require('mongoose')

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Client name is required'],
    trim: true
  },
  role: {
    type: String,
    required: [true, 'Client role is required'],
    trim: true
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Testimonial content is required']
  },
  avatar: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: 1,
    max: 5,
    default: 5
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

module.exports = mongoose.model('Testimonial', testimonialSchema)
