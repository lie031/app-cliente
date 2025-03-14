import axiosInstance from "./api";

/**
 * Servicio para gestionar operaciones relacionadas con Medias
 * Utilizamos la instancia de Axios creada 
 */

/**
 * Clase que contiene todos los metodos para interactuar
 * co el endpoint en el Backend
 */

const mediaService = {

    /**
     * Obtiene la lista de todos los usuarios
     * @returns {promise} promesa que resuelve el array de medias
     */
    getAll: async () => {
        try {
            const response = await axiosInstance.get('/medias')
            return response.data;
        } catch (error) {
            console.error("Error al obtener los usuarios: ", error);
            throw error;
        }
    },

    /**
     * 
     * @param {Object} mediaData - Datos de la media a crear 
     * @returns {Promise} Promesa que resuelve los datos de la media creada
     */
    create: async (mediaData) => {
        try {
            const response = await axiosInstance.post('/medias', mediaData);
            return response.data;
        } catch (error) {
            console.error("Error al crear la Media: ", error);
            throw error;
        }
    },
    /**
     * 
     * @param {string|number} id - ID de la media a Actualizar 
     * @param {Object} mediaData - Nuevos datos de la media 
     * @returns {Promise} Promesa que resuelve a los datos del usuario actualizado
     */
    update: async (_id, mediaData) => {
        try {
            const response = await axiosInstance.put(`/medias/${_id}`,mediaData);
            return response.data;
        } catch (error) {
            console.error("Error al actualizar la Media", error);
            throw error;
        }
    },

    /**
     * 
     * @param {string|number} id - ID de la media a eliminar
     * @returns {Promise} promesa que resuelve la respuesta del servidor
     */
    delete: async (_id) => {
        try {
            const response = await axiosInstance.delete(`/medias/${_id}`);
            return response.data;
        } catch (error) {
            console.error("Error al eliminar la Media", error);
            throw error;
        }
    }
};

export default mediaService;