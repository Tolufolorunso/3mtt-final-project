// Register Page
// Provides a form for new users to create an account and join the movie app.

import { useState } from 'react'
import API from '../services/api'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  let navigate = useNavigate()

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await API.post('/auth/register', form)
      navigate('/login', { replace: true })
      // login(res.data.user, res.data.token)
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed')
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
        <h2 className='text-2xl font-semibold text-center'>Register</h2>
        <input
          type='text'
          name='name'
          placeholder='Name'
          className='w-full p-2 border rounded'
          value={form.name}
          onChange={handleChange}
          required
        />
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
          className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700'
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
        <p>
          Have an account: <Link to='/login'>Login</Link>
        </p>
      </form>
    </div>
  )
}
