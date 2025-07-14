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
