import { useState } from 'react'
import API from '../services/api'
import { Link } from 'react-router'

export default function Search() {
  const [query, setQuery] = useState('')
  const [year, setYear] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await API.get('/movies/search', {
        params: { query, year, sortBy },
      })
      setMovies(res.data.results)
    } catch (err) {
      alert('Search failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='p-4 max-w-6xl mx-auto'>
      <h1 className='text-2xl font-bold mb-4 text-center'>🎬 Search Movies</h1>

      <form
        onSubmit={handleSearch}
        className='flex flex-wrap gap-4 items-center justify-center mb-6'
      >
        <input
          type='text'
          placeholder='Search by title...'
          className='border px-4 py-2 rounded w-60'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <input
          type='number'
          placeholder='Year'
          className='border px-4 py-2 rounded w-28'
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <select
          className='border px-4 py-2 rounded w-48'
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value=''>Sort by</option>
          <option value='popularity.desc'>Popularity</option>
          <option value='vote_average.desc'>Top Rated</option>
          <option value='release_date.desc'>Newest</option>
        </select>
        <button
          type='submit'
          className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700'
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {movies.length > 0 && (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
          {movies.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id}>
              <div
                key={movie.id}
                className='bg-white rounded shadow hover:shadow-md transition p-2'
              >
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

      {movies.length === 0 && !loading && (
        <p className='text-center text-gray-500'>No movies found yet</p>
      )}
    </div>
  )
}
