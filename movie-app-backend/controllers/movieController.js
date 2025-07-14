const tmdb = require('../utils/tmdb')

// @desc    Search movies from TMDB
// @route   GET /api/movies/search
// @access  Public
exports.searchMovies = async (req, res) => {
  try {
    const { query, year, genre, sortBy } = req.query

    // Map filter fields to TMDB parameters
    const params = {
      query,
      include_adult: false,
      page: 1,
    }

    if (year) params.primary_release_year = year

    // Use sortBy if provided (e.g., popularity.desc, vote_average.desc)
    if (sortBy) params.sort_by = sortBy

    // Make request to TMDB
    const response = await tmdb.get('/search/movie', { params })

    res.json({
      message: 'Movies fetched successfully',
      results: response.data.results,
    })
  } catch (err) {
    console.error('TMDB error:', err.message)
    res.status(500).json({ message: 'Failed to fetch movies' })
  }
}

// @desc    Get full details of a movie by TMDB ID
// @route   GET /api/movies/:id
// @access  Public
exports.getMovieDetails = async (req, res) => {
  try {
    const { id } = req.params

    // Make request to TMDB for movie details
    const response = await tmdb.get(`/movie/${id}`)

    // Send back full details (or pick selected fields if needed)
    res.json({
      message: 'Movie details fetched successfully',
      movie: response.data,
    })
  } catch (err) {
    console.error('TMDB Movie Details Error:', err.message)
    res.status(500).json({ message: 'Failed to fetch movie details' })
  }
}
