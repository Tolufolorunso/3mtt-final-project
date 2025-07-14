import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <header className='bg-gray-800 text-white shadow'>
      <div className='container mx-auto px-4 py-3 flex justify-between items-center'>
        <h1
          onClick={() => navigate('/dashboard')}
          className='text-xl font-bold cursor-pointer'
        >
          🎬 MovieRec
        </h1>

        <nav className='flex gap-4 items-center text-sm font-medium'>
          {user ? (
            <>
              <Link to='/dashboard' className='hover:text-blue-400'>
                Dashboard
              </Link>
              <Link to='/search' className='hover:text-blue-400'>
                Search
              </Link>
              <Link to='/favorites' className='hover:text-blue-400'>
                Favorites
              </Link>
              <Link to='/watchlists' className='hover:text-blue-400'>
                WatchLists
              </Link>
              <button
                onClick={logout}
                className='bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-white'
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to='/login' className='hover:text-blue-400'>
                Login
              </Link>
              <Link to='/register' className='hover:text-blue-400'>
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
