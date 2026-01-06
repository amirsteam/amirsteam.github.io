// Generic CRUD controller factory for simpler models

const createCRUDController = (Model, modelName) => {
  return {
    // @desc    Get all items (public)
    getAll: async (req, res, next) => {
      try {
        const query = { isPublished: true }
        const items = await Model.find(query).sort({ order: 1, createdAt: -1 })

        res.status(200).json({
          success: true,
          count: items.length,
          data: items
        })
      } catch (error) {
        next(error)
      }
    },

    // @desc    Get single item
    getOne: async (req, res, next) => {
      try {
        const item = await Model.findById(req.params.id)

        if (!item) {
          return res.status(404).json({
            success: false,
            message: `${modelName} not found`
          })
        }

        res.status(200).json({
          success: true,
          data: item
        })
      } catch (error) {
        next(error)
      }
    },

    // @desc    Get all items (admin)
    getAllAdmin: async (req, res, next) => {
      try {
        const items = await Model.find().sort({ order: 1, createdAt: -1 })

        res.status(200).json({
          success: true,
          count: items.length,
          data: items
        })
      } catch (error) {
        next(error)
      }
    },

    // @desc    Create item
    create: async (req, res, next) => {
      try {
        const item = await Model.create(req.body)

        res.status(201).json({
          success: true,
          data: item
        })
      } catch (error) {
        next(error)
      }
    },

    // @desc    Update item
    update: async (req, res, next) => {
      try {
        const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true
        })

        if (!item) {
          return res.status(404).json({
            success: false,
            message: `${modelName} not found`
          })
        }

        res.status(200).json({
          success: true,
          data: item
        })
      } catch (error) {
        next(error)
      }
    },

    // @desc    Delete item
    delete: async (req, res, next) => {
      try {
        const item = await Model.findByIdAndDelete(req.params.id)

        if (!item) {
          return res.status(404).json({
            success: false,
            message: `${modelName} not found`
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
  }
}

// Create controllers for each model
const Skill = require('../models/Skill')
const Service = require('../models/Service')
const Experience = require('../models/Experience')
const Testimonial = require('../models/Testimonial')

exports.skillController = createCRUDController(Skill, 'Skill')
exports.serviceController = createCRUDController(Service, 'Service')
exports.experienceController = createCRUDController(Experience, 'Experience')
exports.testimonialController = createCRUDController(Testimonial, 'Testimonial')
