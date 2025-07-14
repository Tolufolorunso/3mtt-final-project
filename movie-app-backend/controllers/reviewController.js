// Review Controller
// Handles adding, retrieving, and managing reviews for movies by users.
// Main responsibilities:
// - Add a review to a movie
// - Get all reviews for a movie
// - Delete or update reviews (if implemented)

// controllers/reviewController.js
const Review = require('../models/Review')

// 🟢 POST /api/reviews/:movieId → Create or update review
exports.submitReview = async (req, res) => {
  const { rating, comment } = req.body
  const { movieId } = req.params

  try {
    const review = await Review.findOneAndUpdate(
      { user: req.user.id, movieId },
      { rating, comment },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    res.status(200).json({ message: 'Review saved', review })
  } catch (err) {
    console.error('Submit Review Error:', err.message)
    res.status(500).json({ message: 'Failed to save review' })
  }
}

// 🟢 GET /api/reviews/:movieId → Get all reviews for a movie
exports.getMovieReviews = async (req, res) => {
  const { movieId } = req.params

  try {
    const reviews = await Review.find({ movieId }).populate('user', 'name')
    res.status(200).json({ reviews })
  } catch (err) {
    console.error('Get Reviews Error:', err.message)
    res.status(500).json({ message: 'Failed to fetch reviews' })
  }
}

// 🔴 DELETE /api/reviews/:movieId → Delete current user's review
exports.deleteReview = async (req, res) => {
  const { movieId } = req.params

  try {
    await Review.findOneAndDelete({ user: req.user.id, movieId })
    res.status(200).json({ message: 'Review deleted' })
  } catch (err) {
    console.error('Delete Review Error:', err.message)
    res.status(500).json({ message: 'Failed to delete review' })
  }
}
