const mongoose = require('mongoose')

const watchlistSchema = new mongoose.Schema({
  name: { type: String, required: true }, // watchlist name (e.g., “Sci-fi”, “To Watch”)
  movies: [{ type: Number }], // Array of TMDB movie IDs
})

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    favorites: [
      {
        type: Number, // TMDB movie ID
      },
    ],
    watchlists: [watchlistSchema],
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
