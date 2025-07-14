// API Service
// Handles HTTP requests to the backend for authentication, movies, reviews, favorites, and watchlists.
// Centralizes all API interactions for the frontend.

import axios from 'axios'

const API_URL = 'https://threemtt-final-project-dzef.onrender.com/api'

const API = axios.create({
  baseURL: API_URL, // Change in production
})

// Attach token to request if it exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token')
  console.log(token)
  if (token) {
    req.headers.Authorization = `Bearer ${token}`
  }
  return req
})

export default API
