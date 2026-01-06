const Blog = require('../models/Blog')

// @desc    Get all published blogs
// @route   GET /api/blogs
// @access  Public
exports.getBlogs = async (req, res, next) => {
  try {
    const query = { isPublished: true }
    
    if (req.query.category) {
      query.category = req.query.category
    }

    if (req.query.tag) {
      query.tags = { $in: [req.query.tag] }
    }

    const page = parseInt(req.query.page, 10) || 1
    const limit = parseInt(req.query.limit, 10) || 10
    const skip = (page - 1) * limit

    const blogs = await Blog.find(query)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'name avatar')

    const total = await Blog.countDocuments(query)

    res.status(200).json({
      success: true,
      count: blogs.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: blogs
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get single blog
// @route   GET /api/blogs/:slug
// @access  Public
exports.getBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
      isPublished: true
    }).populate('author', 'name avatar')

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      })
    }

    // Increment views
    blog.views += 1
    await blog.save({ validateBeforeSave: false })

    res.status(200).json({
      success: true,
      data: blog
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get all blogs (admin)
// @route   GET /api/admin/blogs
// @access  Private
exports.getAdminBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .populate('author', 'name avatar')

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Create blog
// @route   POST /api/admin/blogs
// @access  Private
exports.createBlog = async (req, res, next) => {
  try {
    req.body.author = req.admin.id
    const blog = await Blog.create(req.body)

    res.status(201).json({
      success: true,
      data: blog
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update blog
// @route   PUT /api/admin/blogs/:id
// @access  Private
exports.updateBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      })
    }

    res.status(200).json({
      success: true,
      data: blog
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Delete blog
// @route   DELETE /api/admin/blogs/:id
// @access  Private
exports.deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id)

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      })
    }

    res.status(200).json({
      success: true,
      data: {}
    })
  } catch (error) {
    next(error)
  }
}
