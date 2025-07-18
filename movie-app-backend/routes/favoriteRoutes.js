// Favorite Routes
// Defines API endpoints for managing user's favorite movies (add, remove, list).
// All routes are prefixed with /api/user/favorites

const express = require('express')
const router = express.Router()
const {
  addFavorite,
  getFavorites,
} = require('../controllers/favoriteController')
const authMiddleware = require('../middleware/authMiddleware')

// Protect both routes
router.post('/favorites', authMiddleware, addFavorite)
router.get('/favorites', authMiddleware, getFavorites)

module.exports = router
