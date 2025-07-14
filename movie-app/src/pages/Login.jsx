// Login Page
// Provides a form for users to log in to their account and access personalized features.

import { useState } from 'react'
import API from '../services/api'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await API.post('/auth/login', form)
      login(res.data.user, res.data.token)
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 px-4'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-6 rounded-lg shadow-md w-full max-w-sm space-y-4'
      >
        <h2 className='text-2xl font-semibold text-center'>Login</h2>
        <input
          type='email'
          name='email'
          placeholder='Email'
          className='w-full p-2 border rounded'
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          className='w-full p-2 border rounded'
          value={form.password}
          onChange={handleChange}
          required
        />
        <button
          type='submit'
          className='w-full bg-green-600 text-white py-2 rounded hover:bg-green-700'
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p>
          Don't have an account: <Link to='/register'>Register</Link>
        </p>
      </form>
    </div>
  )
}
