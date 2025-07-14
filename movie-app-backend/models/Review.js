// models/Review.js
const mongoose = require('mongoose')

// 🔶 Each review is tied to a user and a movie (TMDB movie ID)
const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    movieId: { type: Number, required: true }, // TMDB movie ID
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
  },
  { timestamps: true }
)

// A user can only review the same movie once
reviewSchema.index({ user: 1, movieId: 1 }, { unique: true })

module.exports = mongoose.model('Review', reviewSchema)
