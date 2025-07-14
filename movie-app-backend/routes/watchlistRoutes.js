const express = require('express')
const router = express.Router()
const {
  createWatchlist,
  addToWatchlist,
  getWatchlists,
  removeFromWatchlist,
} = require('../controllers/watchlistController')
const authMiddleware = require('../middleware/authMiddleware')

// Protected Routes
router.post('/watchlists', authMiddleware, createWatchlist) // Create list
router.post('/watchlists/:name', authMiddleware, addToWatchlist) // Add movie
router.get('/watchlists', authMiddleware, getWatchlists) // Get all
router.delete('/watchlists/:name/:movieId', authMiddleware, removeFromWatchlist) // Remove movie

module.exports = router
