// Watchlist Controller
// Handles creating, updating, and retrieving user watchlists.
// Main responsibilities:
// - Add a movie to a user's watchlist
// - Remove a movie from a watchlist
// - Get all watchlists for a user
// - Manage watchlist items

// controllers/watchlistController.js
const User = require('../models/User')

// @desc    Create a new watchlist
// @route   POST /api/user/watchlists
// @access  Private
exports.createWatchlist = async (req, res) => {
  const { name } = req.body

  if (!name)
    return res.status(400).json({ message: 'Watchlist name is required' })

  try {
    const user = await User.findById(req.user.id)

    // Prevent duplicate watchlist names
    const exists = user.watchlists.find((wl) => wl.name === name)
    if (exists)
      return res.status(400).json({ message: 'Watchlist already exists' })

    user.watchlists.push({ name, movies: [] })
    await user.save()

    res.status(201).json({ message: 'Watchlist created' })
  } catch (err) {
    console.error('Create Watchlist Error:', err.message)
    res.status(500).json({ message: 'Failed to create watchlist' })
  }
}

// @desc    Add movie to a watchlist
// @route   POST /api/user/watchlists/:name
// @access  Private
exports.addToWatchlist = async (req, res) => {
  const { name } = req.params
  const { movieId } = req.body

  if (!movieId) return res.status(400).json({ message: 'Movie ID is required' })

  try {
    const user = await User.findById(req.user.id)
    const list = user.watchlists.find((wl) => wl.name === name)

    if (!list) return res.status(404).json({ message: 'Watchlist not found' })

    // Prevent duplicates
    if (!list.movies.includes(movieId)) {
      list.movies.push(movieId)
      await user.save()
    }

    res.json({ message: 'Movie added to watchlist' })
  } catch (err) {
    console.error('Add to Watchlist Error:', err.message)
    res.status(500).json({ message: 'Failed to add movie to watchlist' })
  }
}

// @desc    Get all watchlists with movie IDs
// @route   GET /api/user/watchlists
// @access  Private
exports.getWatchlists = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    res.json({ watchlists: user.watchlists })
  } catch (err) {
    console.error('Get Watchlists Error:', err.message)
    res.status(500).json({ message: 'Failed to get watchlists' })
  }
}

// @desc    Remove movie from watchlist
// @route   DELETE /api/user/watchlists/:name/:movieId
// @access  Private
exports.removeFromWatchlist = async (req, res) => {
  const { name, movieId } = req.params

  try {
    const user = await User.findById(req.user.id)
    const list = user.watchlists.find((wl) => wl.name === name)

    if (!list) return res.status(404).json({ message: 'Watchlist not found' })

    // Remove movie ID
    list.movies = list.movies.filter((id) => id != movieId)
    await user.save()

    res.json({ message: 'Movie removed from watchlist' })
  } catch (err) {
    console.error('Remove Watchlist Movie Error:', err.message)
    res.status(500).json({ message: 'Failed to remove movie' })
  }
}
