// User Routes
// Defines API endpoints for user profile management and user-specific data.
// All routes are prefixed with /api/user

const express = require('express')
const router = express.Router()
const protect = require('../middleware/authMiddleware')

// @route GET /api/user/profile
// @desc  Get user profile
// @access Private
router.get('/profile', protect, async (req, res) => {
  res.json({
    message: 'Profile fetched successfully',
    user: req.user,
  })
})

module.exports = router
