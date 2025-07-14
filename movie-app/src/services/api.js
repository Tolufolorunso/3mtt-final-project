import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5500/api', // Change in production
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
