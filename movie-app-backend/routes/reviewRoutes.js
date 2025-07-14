// Review Routes
// Defines API endpoints for adding and retrieving reviews for movies.
// All routes are prefixed with /api/reviews

const express = require('express')
const router = express.Router()
const {
  submitReview,
  getMovieReviews,
  deleteReview,
} = require('../controllers/reviewController')

const authMiddleware = require('../middleware/authMiddleware')

// ✅ Public: Get all reviews for a movie
router.get('/:movieId', getMovieReviews)

// 🔐 Private: Create/update a review
router.post('/:movieId', authMiddleware, submitReview)

// 🔐 Private: Delete review
router.delete('/:movieId', authMiddleware, deleteReview)

module.exports = router
