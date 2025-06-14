import axiosInstance from './api'

export const login = async (credentials) => {
    try {
        const response = await axiosInstance.post('/auth/login', credentials)
        if (response.data.token) {
            localStorage.setItem('token', response.data.token)
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
        }
        return response.data
    } catch (error) {
        console.error('Error en login:', error.response?.data || error.message)
        throw error.response?.data || { msg: 'Error al iniciar sesión' }
    }
}

export const register = async (userData) => {
    try {
        console.log('Enviando datos de registro:', userData)
        const response = await axiosInstance.post('/auth/register', userData)
        console.log('Respuesta del servidor:', response.data)
        if (response.data.token) {
            localStorage.setItem('token', response.data.token)
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
        }
        return response.data
    } catch (error) {
        console.error('Error en registro:', error.response?.data || error.message)
        throw error.response?.data || { msg: 'Error al registrar usuario' }
    }
}

export const registerAdmin = async (userData) => {
    try {
        console.log('Enviando datos de registro de admin:', userData)
        const response = await axiosInstance.post('/auth/register-admin', userData)
        console.log('Respuesta del servidor:', response.data)
        if (response.data.token) {
            localStorage.setItem('token', response.data.token)
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
        }
        return response.data
    } catch (error) {
        console.error('Error en registro de admin:', error.response?.data || error.message)
        throw error.response?.data || { msg: 'Error al registrar administrador' }
    }
}

export const logout = () => {
    localStorage.removeItem('token')
    delete axiosInstance.defaults.headers.common['Authorization']
}

export const getCurrentUser = async (token) => {
    try {
        const response = await axiosInstance.get('/auth/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.error('Error al obtener usuario actual:', error.response?.data || error.message)
        throw error.response?.data || { msg: 'Error al obtener información del usuario' }
    }
}

export const isAuthenticated = () => {
    const token = localStorage.getItem('token')
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
        return true
    }
    return false
} 