const User = require('../models/User')

// @desc    Add a movie to favorites
// @route   POST /api/user/favorites
// @access  Private
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
