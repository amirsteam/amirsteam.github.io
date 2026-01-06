const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Blog title is required'],
    trim: true
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'],
    maxlength: [300, 'Excerpt cannot be more than 300 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required']
  },
  tags: [{
    type: String
  }],
  thumbnail: {
    type: String,
    default: ''
  },
  readTime: {
    type: String,
    default: '5 min read'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  views: {
    type: Number,
    default: 0
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date
  }
}, {
  timestamps: true
})

// Generate slug from title
blogSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-')
  }
  
  // Set publishedAt when first published
  if (this.isModified('isPublished') && this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date()
  }
  
  // Calculate read time based on content
  if (this.isModified('content')) {
    const words = this.content.trim().split(/\s+/).length
    const minutes = Math.ceil(words / 200)
    this.readTime = `${minutes} min read`
  }
  
  next()
})

module.exports = mongoose.model('Blog', blogSchema)
