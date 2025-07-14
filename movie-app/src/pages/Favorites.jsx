// Favorites Page
// Displays all movies that the user has marked as favorites.
// Allows users to manage their favorite movies.

import { useEffect, useState } from 'react'
import API from '../services/api'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function Favorites() {
  const [favorites, setFavorites] = useState([])
  const [movies, setMovies] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await API.get('/user/favorites', {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        })

        setFavorites(res.data.favorites)
      } catch (err) {
        console.error('Error getting favorites', err)
      }
    }

    fetchFavorites()
  }, [user])

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const details = await Promise.all(
        favorites.map(async (id) => {
          try {
            const res = await API.get(`/movies/${id}`)
            return res.data.movie
          } catch {
            return null
          }
        })
      )
      setMovies(details.filter(Boolean))
    }

    if (favorites.length > 0) {
      fetchMovieDetails()
    }
  }, [favorites])

  return (
    <div className='p-6 max-w-6xl mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>Your Favorite Movies</h1>

      {movies.length === 0 ? (
        <p className='text-gray-500'>No favorites yet.</p>
      ) : (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
          {movies.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id}>
              <div className='bg-white rounded shadow p-2 hover:shadow-lg transition'>
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                      : 'https://via.placeholder.com/300x450?text=No+Image'
                  }
                  alt={movie.title}
                  className='w-full h-64 object-cover rounded'
                />
                <h2 className='text-md font-semibold mt-2'>{movie.title}</h2>
                <p className='text-sm text-gray-500'>
                  {movie.release_date?.split('-')[0]} • ⭐ {movie.vote_average}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
