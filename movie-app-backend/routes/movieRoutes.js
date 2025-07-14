// Movie Routes
// Defines API endpoints for fetching movies, searching, and getting movie details.
// All routes are prefixed with /api/movies

const express = require('express')
const router = express.Router()
const {
  searchMovies,
  getMovieDetails,
} = require('../controllers/movieController')

// @route GET /api/movies/search
router.get('/search', searchMovies)

// @route GET /api/movies/:id
router.get('/:id', getMovieDetails) // Get movie by TMDB ID

module.exports = router
