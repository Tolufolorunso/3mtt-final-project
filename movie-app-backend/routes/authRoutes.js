// Auth Routes
// Defines authentication-related API endpoints for user registration, login, and authentication management.
// All routes are prefixed with /api/auth

const express = require('express')
const router = express.Router()
const { registerUser, loginUser } = require('../controllers/authController')

// Register Route
router.post('/register', registerUser)

// Login Route
router.post('/login', loginUser)

module.exports = router
