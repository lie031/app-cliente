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
            //Almacenamos la respuesta de la base de datos con la solicitud get
            const response = await axiosInstance.get('/medias')
            //Retornamos los datos obtenidos mediante la URL
            return response.data;
        } catch (error) {
            //Imprimimos el Error obtenido 
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
            //Almacenamos el proceso que se hara en la base de datos mediante el metodo POST, utilizando el parametro mediaData para enviar los datos del objeto
            const response = await axiosInstance.post('/medias', mediaData);
            //Retornamos los datos que se generan
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
            /**
             * Almacenaremos el proceso que se realizara a la base de datos mediante la URL con el metodo PUT
             * Definimos el ID de la Media a actualizar
             * Utilizamos el Parametro mediaData para Enviar los Datos que se usaran
             */
            const response = await axiosInstance.put(`/medias/${_id}`,mediaData);

            //Retornamos los datos que se crearon
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
            /**
             * Almacenamos el Proceso que se hara en la base de datos mediante la URL
             * Utilizamos el ID como parametro para elegir que Media eliminar de la DB
             */
            const response = await axiosInstance.delete(`/medias/${_id}`);
            
            //Retornamos los datos actualizados de la DB
            return response.data;
        } catch (error) {
            console.error("Error al eliminar la Media", error);
            throw error;
        }
    }
};

//Exportamos el Servicio para poder utilizarlo en otros documentos
export default mediaService;