const Project = require('../models/Project')

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
exports.getProjects = async (req, res, next) => {
  try {
    const query = { isPublished: true }
    
    if (req.query.featured === 'true') {
      query.featured = true
    }
    
    if (req.query.category) {
      query.category = req.query.category
    }

    const projects = await Project.find(query).sort({ order: 1, createdAt: -1 })

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
exports.getProject = async (req, res, next) => {
  try {
    const project = await Project.findOne({
      $or: [
        { _id: req.params.id },
        { slug: req.params.id }
      ],
      isPublished: true
    })

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      })
    }

    res.status(200).json({
      success: true,
      data: project
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get all projects (admin)
// @route   GET /api/admin/projects
// @access  Private
exports.getAdminProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 })

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Create project
// @route   POST /api/admin/projects
// @access  Private
exports.createProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body)

    res.status(201).json({
      success: true,
      data: project
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update project
// @route   PUT /api/admin/projects/:id
// @access  Private
exports.updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      })
    }

    res.status(200).json({
      success: true,
      data: project
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Delete project
// @route   DELETE /api/admin/projects/:id
// @access  Private
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
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
