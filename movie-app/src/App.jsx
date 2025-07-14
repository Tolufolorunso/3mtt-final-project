import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { AuthProvider, useAuth } from './context/AuthContext'
import Search from './pages/Search'
import Header from './components/Header'
import MovieDetail from './pages/MovieDetail'
import Favorites from './pages/Favorites'
import Watchlists from './pages/Watchlists'

const PrivateRoute = ({ children }) => {
  const { user } = useAuth()
  return user ? children : <Navigate to='/login' />
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header /> {/* Global header */}
        <Routes>
          {/* Public routes */}
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />

          {/* Private routes */}
          <Route
            path='/dashboard'
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path='/watchlists'
            element={
              <PrivateRoute>
                <Watchlists />
              </PrivateRoute>
            }
          />
          <Route
            path='/search'
            element={
              <PrivateRoute>
                <Search />
              </PrivateRoute>
            }
          />
          <Route
            path='/favorites'
            element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            }
          />
          <Route
            path='/movie/:id'
            element={
              <PrivateRoute>
                <MovieDetail />
              </PrivateRoute>
            }
          />

          {/* Redirect unknown routes */}
          <Route path='*' element={<Navigate to='/dashboard' />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
