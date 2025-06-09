import { createContext, useContext, useState, useEffect } from 'react'
import { login, register, registerAdmin, logout, getCurrentUser } from '../services/authService'

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      getCurrentUser(token)
        .then(userData => {
          setUser(userData)
        })
        .catch(error => {
          console.error('Error al obtener usuario:', error)
          localStorage.removeItem('token')
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  const loginUser = async (credentials) => {
    const data = await login(credentials)
    setUser(data.user)
    return data
  }

  const registerUser = async (userData) => {
    const data = await register(userData)
    setUser(data.user)
    return data
  }

  const registerAdminUser = async (userData) => {
    const data = await registerAdmin(userData)
    setUser(data.user)
    return data
  }

  const logoutUser = () => {
    logout()
    setUser(null)
  }

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login: loginUser,
    register: registerUser,
    registerAdmin: registerAdminUser,
    logout: logoutUser
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
} 