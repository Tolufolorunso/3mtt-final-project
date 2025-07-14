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
