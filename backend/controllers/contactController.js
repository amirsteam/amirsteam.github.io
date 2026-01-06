const Contact = require('../models/Contact')

// @desc    Create contact message
// @route   POST /api/contact
// @access  Public
exports.createContact = async (req, res, next) => {
  try {
    const contact = await Contact.create(req.body)

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully!',
      data: {
        id: contact._id
      }
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get all contacts (admin)
// @route   GET /api/admin/contacts
// @access  Private
exports.getContacts = async (req, res, next) => {
  try {
    const query = {}
    
    if (req.query.status) {
      query.status = req.query.status
    }

    const contacts = await Contact.find(query).sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get single contact
// @route   GET /api/admin/contacts/:id
// @access  Private
exports.getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id)

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      })
    }

    res.status(200).json({
      success: true,
      data: contact
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update contact status
// @route   PUT /api/admin/contacts/:id
// @access  Private
exports.updateContact = async (req, res, next) => {
  try {
    const updateData = {
      status: req.body.status,
      notes: req.body.notes
    }

    if (req.body.status === 'replied') {
      updateData.repliedAt = new Date()
    }

    const contact = await Contact.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    })

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      })
    }

    res.status(200).json({
      success: true,
      data: contact
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Delete contact
// @route   DELETE /api/admin/contacts/:id
// @access  Private
exports.deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id)

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
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

// @desc    Get contact stats
// @route   GET /api/admin/contacts/stats
// @access  Private
exports.getContactStats = async (req, res, next) => {
  try {
    const stats = await Contact.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ])

    const total = await Contact.countDocuments()
    const newCount = stats.find(s => s._id === 'new')?.count || 0

    res.status(200).json({
      success: true,
      data: {
        total,
        new: newCount,
        stats
      }
    })
  } catch (error) {
    next(error)
  }
}
