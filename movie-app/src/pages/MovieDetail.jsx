// Movie Detail Page
// Shows detailed information about a selected movie, including reviews, ratings, and related actions.

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../services/api'
import { useAuth } from '../context/AuthContext'
import Reviews from '../components/Reviews'
import ReviewForm from '../components/ReviewForm'

export default function MovieDetail() {
  const { id } = useParams() // get TMDB movie ID from URL
  const [movie, setMovie] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  // 📌 Add this state and function near the top
  const [watchlists, setWatchlists] = useState([])
  const [selectedList, setSelectedList] = useState('')

  const { user } = useAuth()

  // 🔽 Add states
  const [reviews, setReviews] = useState([])
  const [myReview, setMyReview] = useState(null) // user's own review
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(5)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await API.get(`/reviews/${id}`)
        setReviews(res.data.reviews)

        // 🔍 Find current user's review
        const currentUserReview = res.data.reviews.find(
          (r) => r.user._id === user?.id
        )

        if (currentUserReview) {
          setMyReview(currentUserReview)
          setComment(currentUserReview.comment || '')
          setRating(currentUserReview.rating)
        }
      } catch (err) {
        console.error('Error loading reviews:', err.message)
      }
    }

    if (id) {
      fetchReviews()
    }
  }, [id, user])

  // 📌 Load user's watchlists
  useEffect(() => {
    const fetchLists = async () => {
      try {
        const res = await API.get('/user/watchlists', {
          headers: { Authorization: `Bearer ${user?.token}` },
        })
        setWatchlists(res.data.watchlists)
      } catch (err) {
        console.error(err)
      }
    }
    if (user) fetchLists()
  }, [user])

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await API.get(`/movies/${id}`)
        setMovie(res.data.movie)
      } catch (err) {
        setError('Could not load movie details')
      } finally {
        setLoading(false)
      }
    }

    fetchMovie()
  }, [id])

  // 📌 Add to selected watchlist
  const handleAddToList = async () => {
    if (!selectedList) return alert('Select a watchlist')
    try {
      await API.post(
        `/user/watchlists/${selectedList}`,
        { movieId: movie.id },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      )
      alert('✅ Added to watchlist')
    } catch (err) {
      alert('❌ Failed to add')
      console.error(err)
    }
  }

  const handleSaveFavorite = async () => {
    try {
      await API.post(
        '/user/favorites',
        { movieId: movie.id },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      alert('✅ Saved to favorites!')
    } catch (err) {
      console.error(err)
      alert('❌ Could not save to favorites')
    }
  }

  const handleSubmitReview = async () => {
    try {
      await API.post(
        `/reviews/${id}`,
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      alert('✅ Review submitted')
      window.location.reload()
    } catch (err) {
      console.error('Submit Error:', err.message)
      alert('❌ Failed to submit review')
    }
  }

  const handleDeleteReview = async () => {
    try {
      await API.delete(`/reviews/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      alert('🗑️ Review deleted')
      window.location.reload()
    } catch (err) {
      console.error('Delete Error:', err.message)
      alert('❌ Failed to delete review')
    }
  }

  if (loading)
    return <p className='text-center mt-10'>Loading movie details...</p>
  if (error) return <p className='text-center text-red-500 mt-10'>{error}</p>
  if (!movie) return null

  return (
    <div className='p-6 max-w-5xl mx-auto text-gray-900 dark:text-white'>
      <div className='flex flex-col md:flex-row gap-6'>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : 'https://via.placeholder.com/300x450?text=No+Image'
          }
          alt={movie.title}
          className='w-full md:w-1/3 rounded shadow'
        />

        <div className='md:flex-1'>
          <h1 className='text-3xl font-bold mb-2'>{movie.title}</h1>
          <p className='text-sm text-gray-500 mb-2'>
            {movie.release_date?.split('-')[0]} • ⭐ {movie.vote_average}
          </p>

          {movie.genres && (
            <>
              <div className='flex flex-wrap gap-2 mb-4'>
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className='bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-xs'
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {user && (
                <button
                  onClick={handleSaveFavorite}
                  className='bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 mb-4'
                >
                  ♥️ Save to Favorites
                </button>
              )}
              {user && (
                <div className='mt-4'>
                  <label className='block text-sm font-medium mb-1'>
                    Add to Watchlist
                  </label>
                  <div className='flex items-center gap-2'>
                    <select
                      value={selectedList}
                      onChange={(e) => setSelectedList(e.target.value)}
                      className='border rounded px-2 py-1'
                    >
                      <option value=''>Select watchlist</option>
                      {watchlists.map((list) => (
                        <option key={list.name} value={list.name}>
                          {list.name}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={handleAddToList}
                      className='bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700'
                    >
                      ➕ Add
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          <p className='leading-relaxed text-base mb-6'>{movie.overview}</p>

          {movie.homepage && (
            <a
              href={movie.homepage}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-500 hover:underline'
            >
              🔗 Official Website
            </a>
          )}
          {/* ✍️ Submit/Edit Review */}
          {user && (
            <ReviewForm
              myReview={myReview}
              rating={rating}
              setRating={setRating}
              Number={Number}
              reviews={reviews}
              comment={comment}
              setComment={setComment}
              handleSubmitReview={handleSubmitReview}
              handleDeleteReview={handleDeleteReview}
            />
          )}
          {/* 💬 Show All Reviews */}
          <Reviews reviews={reviews} />
        </div>
      </div>
    </div>
  )
}
