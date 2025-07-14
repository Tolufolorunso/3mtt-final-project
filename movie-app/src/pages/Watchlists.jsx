// pages/Watchlists.jsx
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import API from '../services/api'
import { Link } from 'react-router-dom'

export default function Watchlists() {
  // Auth and state
  const { user } = useAuth()
  const [watchlists, setWatchlists] = useState([])
  const [newList, setNewList] = useState('')

  // 🔃 Load all watchlists on mount
  useEffect(() => {
    const fetchWatchlists = async () => {
      try {
        const res = await API.get('/user/watchlists', {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        })
        setWatchlists(res.data.watchlists)
      } catch (err) {
        console.error('Error fetching watchlists:', err)
      }
    }

    fetchWatchlists()
  }, [user])

  // ➕ Create new watchlist
  const handleCreateList = async () => {
    if (!newList.trim()) return
    try {
      await API.post('/user/watchlists', { name: newList })
      setNewList('')
      window.location.reload() // refresh list
    } catch (err) {
      alert('Failed to create watchlist')
      console.error(err)
    }
  }

  // ❌ Remove movie from watchlist
  const handleRemoveMovie = async (name, movieId) => {
    try {
      await API.delete(`/user/watchlists/${name}/${movieId}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      window.location.reload() // reload after delete
    } catch (err) {
      console.error(err)
      alert('Failed to remove movie')
    }
  }

  return (
    <div className='p-6 max-w-6xl mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>🎬 Your Watchlists</h1>

      {/* Add new watchlist */}
      <div className='flex gap-2 mb-6'>
        <input
          type='text'
          placeholder='New watchlist name'
          value={newList}
          onChange={(e) => setNewList(e.target.value)}
          className='border px-3 py-2 rounded w-64'
        />
        <button
          onClick={handleCreateList}
          className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
        >
          ➕ Create
        </button>
      </div>

      {/* List of all watchlists and their movies */}
      {watchlists.length === 0 ? (
        <p className='text-gray-500'>No watchlists found.</p>
      ) : (
        <div className='space-y-8'>
          {watchlists.map((list) => (
            <div key={list.name}>
              <h2 className='text-xl font-semibold mb-3'>{list.name}</h2>
              {list.movies.length === 0 ? (
                <p className='text-sm text-gray-400'>No movies yet.</p>
              ) : (
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
                  {list.movies.map((id) => (
                    <div key={id} className='relative group'>
                      <Link to={`/movie/${id}`}>
                        <img
                          src={`https://image.tmdb.org/t/p/w300/${id}.jpg`}
                          onError={(e) =>
                            (e.target.src =
                              'https://via.placeholder.com/300x450?text=Movie')
                          }
                          alt={`Movie ${id}`}
                          className='rounded shadow'
                        />
                      </Link>
                      <button
                        onClick={() => handleRemoveMovie(list.name, id)}
                        className='absolute top-1 right-1 bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600 opacity-0 group-hover:opacity-100'
                      >
                        ❌
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
