const axios = require('axios')
require('dotenv').config()

// Base config for TMDB requests

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.TMDB_API_KEY,
    language: 'en-US',
  },
})

module.exports = tmdb
