// Favorite Controller
// Handles adding, removing, and retrieving user's favorite movies.
// Routes in this controller are typically protected and require authentication.
//
// Main responsibilities:
// - Add a movie to user's favorites
// - Remove a movie from favorites
// - Get all favorite movies for a user

const User = require('../models/User')

// @desc    Add a movie to favorites
// @route   POST /api/user/favorites
// @access  Private
// Adds a movie to the authenticated user's list of favorites.
exports.addFavorite = async (req, res) => {
  try {
    const { movieId } = req.body

    if (!movieId)
      return res.status(400).json({ message: 'Movie ID is required' })

    const user = await User.findById(req.user.id)

    // Prevent duplicates
    if (!user.favorites.includes(movieId)) {
      user.favorites.push(movieId)
      await user.save()
    }

    res.status(200).json({ message: 'Movie added to favorites' })
  } catch (err) {
    console.error('Add Favorite Error:', err.message)
    res.status(500).json({ message: 'Failed to add favorite' })
  }
}

// @desc    Get all favorite movies (IDs)
// @route   GET /api/user/favorites
// @access  Private
exports.getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    res.json({ favorites: user.favorites })
  } catch (err) {
    console.error('Get Favorites Error:', err.message)
    res.status(500).json({ message: 'Failed to fetch favorites' })
  }
}
