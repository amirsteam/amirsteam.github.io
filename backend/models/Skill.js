const mongoose = require('mongoose')

const skillItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Skill name is required']
  },
  level: {
    type: Number,
    required: [true, 'Skill level is required'],
    min: 0,
    max: 100
  }
})

const skillSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Skill category title is required'],
    trim: true
  },
  key: {
    type: String,
    required: [true, 'Skill key is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  icon: {
    type: String,
    required: [true, 'Icon name is required']
  },
  color: {
    type: String,
    required: [true, 'Gradient color classes are required'],
    default: 'from-blue-500 to-cyan-500'
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  items: [skillItemSchema],
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

module.exports = mongoose.model('Skill', skillSchema)
