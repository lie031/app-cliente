import axiosInstance from './api';

const authService = {
    login: async (credentials) => {
        try {
            const response = await axiosInstance.post('/api/auth/login', credentials);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                axiosInstance.defaults.headers.common['x-auth-token'] = response.data.token;
            }
            return response.data;
        } catch (error) {
            console.error('Error en login:', error.response?.data || error.message);
            throw error.response?.data || { msg: 'Error al iniciar sesión' };
        }
    },

    registro: async (userData) => {
        try {
            console.log('Enviando datos de registro:', userData);
            const response = await axiosInstance.post('/api/auth/registro', userData);
            console.log('Respuesta del servidor:', response.data);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                axiosInstance.defaults.headers.common['x-auth-token'] = response.data.token;
            }
            return response.data;
        } catch (error) {
            console.error('Error en registro:', error.response?.data || error.message);
            throw error.response?.data || { msg: 'Error al registrar usuario' };
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        delete axiosInstance.defaults.headers.common['x-auth-token'];
    },

    getCurrentUser: async () => {
        try {
            const response = await axiosInstance.get('/api/auth/usuario');
            return response.data;
        } catch (error) {
            console.error('Error al obtener usuario actual:', error.response?.data || error.message);
            throw error.response?.data || { msg: 'Error al obtener información del usuario' };
        }
    },

    isAuthenticated: () => {
        const token = localStorage.getItem('token');
        if (token) {
            axiosInstance.defaults.headers.common['x-auth-token'] = token;
            return true;
        }
        return false;
    }
};

export default authService; 