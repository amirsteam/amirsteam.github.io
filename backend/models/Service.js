const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Service title is required'],
    trim: true
  },
  icon: {
    type: String,
    required: [true, 'Icon name is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  features: [{
    type: String,
    required: true
  }],
  price: {
    type: String,
    required: [true, 'Price is required']
  },
  priceNote: {
    type: String,
    default: 'Starting from'
  },
  popular: {
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

module.exports = mongoose.model('Service', serviceSchema)
