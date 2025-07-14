const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const errorHandler = require('./middleware/errorMiddleware')
const userRoutes = require('./routes/userRoutes')
const movieRoutes = require('./routes/movieRoutes')
const favoriteRoutes = require('./routes/favoriteRoutes')
const watchlistRoutes = require('./routes/watchlistRoutes')
const reviewRoutes = require('./routes/reviewRoutes')

// config
dotenv.config({ path: './.env' })
const app = express()

// middlewares
app.use(cors())
app.use(express.json())

// base route
app.get('/', (req, res) => {
  res.send('API is running...')
})

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/movies', movieRoutes)
app.use('/api/user', favoriteRoutes)
app.use('/api/user', watchlistRoutes)
app.use('/api/reviews', reviewRoutes)

app.use(errorHandler)

// connect to db
connectDB()
  .then(() => {
    // server
    const PORT = process.env.PORT || 5500
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch((err) => {
    console.log(err.message)
  })
