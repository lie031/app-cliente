import React, { createContext, useContext, useState, useEffect } from 'react'
import { login, register, registerAdmin, logout, getCurrentUser } from '../Services/AuthService'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      getCurrentUser(token)
        .then(userData => {
          console.log('Datos del usuario obtenidos (detallado):', {
            userData,
            rol: userData.rol,
            tipo: typeof userData.rol,
            esAdmin: userData.rol?.toUpperCase() === 'ADMIN'
          })
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
    try {
      const data = await login(credentials)
      console.log('Datos de login (detallado):', {
        data,
        user: data.user,
        rol: data.user?.rol,
        tipo: typeof data.user?.rol,
        esAdmin: data.user?.rol?.toUpperCase() === 'ADMIN'
      })
      setUser(data.user)
      return data
    } catch (error) {
      throw error
    }
  }

  const registerUser = async (userData) => {
    try {
      const data = await register(userData)
      console.log('Datos de registro (detallado):', {
        data,
        user: data.user,
        rol: data.user?.rol,
        tipo: typeof data.user?.rol,
        esAdmin: data.user?.rol?.toUpperCase() === 'ADMIN'
      })
      setUser(data.user)
      return data
    } catch (error) {
      throw error
    }
  }

  const registerAdminUser = async (userData) => {
    try {
      const data = await registerAdmin(userData)
      console.log('Datos de registro admin (detallado):', {
        data,
        user: data.user,
        rol: data.user?.rol,
        tipo: typeof data.user?.rol,
        esAdmin: data.user?.rol?.toUpperCase() === 'ADMIN'
      })
      setUser(data.user)
      return data
    } catch (error) {
      throw error
    }
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

  if (loading) {
    return <div>Cargando...</div>
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 