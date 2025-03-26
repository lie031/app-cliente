import axiosInstance from './api'

const ProductoraService = {
    getAll: async () => {
        try {
            const response = await axiosInstance.get("/productoras")
            return response.data
        }
        catch (error) {
            console.error("Error obteniendo las productoras", error)
            throw error
        }
    },

    getById: async (id) => {
        try {
            const response = await axiosInstance.get(`/productoras/${id}`)
            return response.data
        }
        catch (error) {
            console.error("Error obteniendo la productora", error)
            throw error
        }
    },

    create: async (productora) => {
        try {
            const response = await axiosInstance.post("/productoras", productora)
            return response.data
        }
        catch (error) {
            console.error("Error creando la productora", error)
            throw error
        }
    },

    update: async (id, productora) => {
        try {
            const response = await axiosInstance.put(`/productoras/${id}`, productora)
            return response.data
        }
        catch (error) {
            console.error("Error actualizando la productora", error)
            throw error
        }
    },

    delete: async (id) => {
        try {
            const response = await axiosInstance.delete(`/productoras/${id}`)
            return response.data
        }
        catch (error) {
            console.error("Error eliminando la productora", error)
            throw error
        }
    }
}

export default ProductoraService