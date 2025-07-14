import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user, logout } = useAuth()

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold'>Welcome, {user.name} 🎬</h1>
      <p className='text-gray-600'>Email: {user.email}</p>
      <button
        onClick={logout}
        className='mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700'
      >
        Logout
      </button>
    </div>
  )
}
