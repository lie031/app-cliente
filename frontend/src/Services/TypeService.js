import axiosInstance from "./api";

const typeService = {

    /**
     * Obtiene la lista de todos los usuarios
     * @returns {promise} promesa que resuelve el array de tipos
     */
    getAll: async () => {
        try {
            //Almacenamos la respuesta de la base de datos con la solicitud get
            const response = await axiosInstance.get('/tipos')
            //Retornamos los datos obtenidos mediante la URL
            return response.data;
        } catch (error) {
            //Imprimimos el Error obtenido 
            console.error("Error al obtener los tipos: ", error);
            throw error;
        }
    },

    getById: async (_id) => {
        try {
            const response = await axiosInstance.get(`/tipos/${_id}`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener el tipo con el id", error);
            throw error;
        }
    },

    /**
     * 
     * @param {Object} tipoData - Datos del tipo a crear 
     * @returns {Promise} Promesa que resuelve los datos del tipo creado
     */
    create: async (tipoData) => {
        try {
            //Almacenamos el proceso que se hara en la base de datos mediante el metodo POST, utilizando el parametro tipoData para enviar los datos del objeto
            const response = await axiosInstance.post('/tipos', tipoData);
            //Retornamos los datos que se generan
            return response.data;
        } catch (error) {
            console.error("Error al crear el tipo: ", error);
            throw error;
        }
    },
    /**
     * 
     * @param {string|number} id - ID del tipo a Actualizar 
     * @param {Object} tipoData - Nuevos datos del tipo 
     * @returns {Promise} Promesa que resuelve a los datos del tipo actualizado
     */
    update: async (_id, tipoData) => {
        try {
            /**
             * Almacenaremos el proceso que se realizara a la base de datos mediante la URL con el metodo PUT
             * Definimos el ID de la tipo a actualizar
             * Utilizamos el Parametro tipoData para Enviar los Datos que se usaran
             */
            const response = await axiosInstance.put(`/tipos/${_id}`,tipoData);

            //Retornamos los datos que se crearon
            return response.data;
        } catch (error) {
            console.error("Error al actualizar el tipo", error);
            throw error;
        }
    },

    /**
     * 
     * @param {string|number} id - ID del tipo a eliminar
     * @returns {Promise} promesa que resuelve la respuesta del servidor
     */
    delete: async (_id) => {
        try {
            /**
             * Almacenamos el Proceso que se hara en la base de datos mediante la URL
             * Utilizamos el ID como parametro para elegir que Tipo eliminar de la DB
             */
            const response = await axiosInstance.delete(`/tipos/${_id}`);
            
            //Retornamos los datos actualizados de la DB
            return response.data;
        } catch (error) {
            console.error("Error al eliminar el tipo", error);
            throw error;
        }
    }
};

export default typeService;