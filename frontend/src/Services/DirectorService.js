import axiosInstance from './api'

const directorService = {
  getAll: async () => {
    try {
      // Almacenamos la respuesta de la base de datos con la solicitud get
      const response = await axiosInstance.get('/directores')
      // Retornamos los datos obtenidos mediante la URL
      return response.data
    } catch (error) {
      // Imprimimos el Error obtenido
      console.error('Error al obtener los directores: ', error)
      throw error
    }
  },
  getById: async (_id) => {
    try {
      const response = await axiosInstance.get(`/directores/${_id}`)
      return response.data
    } catch (error) {
      console.error('Error al obtener el director con el id', error)
      throw error
    }
  },

  create: async (directorData) => {
    try {
      // Almacenamos el proceso que se hara en la base de datos mediante el metodo POST, utilizando el parametro mediaData para enviar los datos del objeto
      const response = await axiosInstance.post('/directores', directorData)
      // Retornamos los datos que se generan
      return response.data
    } catch (error) {
      console.error('Error al crear el director: ', error)
      throw error
    }
  },

  delete: async (_id) => {
    try {
      /**
       * Almacenamos el Proceso que se hara en la base de datos mediante la URL
       * Utilizamos el ID como parametro para elegir que Media eliminar de la DB
       */
      const response = await axiosInstance.delete(`/directores/${_id}`)

      // Retornamos los datos actualizados de la DB
      return response.data
    } catch (error) {
      console.error('Error al eliminar el director', error)
      throw error
    }
  },

  update: async (_id, directorData) => {
    try {
      /**
       * Almacenaremos el proceso que se realizara a la base de datos mediante la URL con el metodo PUT
       * Definimos el ID de la Media a actualizar
       * Utilizamos el Parametro mediaData para Enviar los Datos que se usaran
       */
      const response = await axiosInstance.put(`/directores/${_id}`, directorData)

      // Retornamos los datos que se crearon
      return response.data
    } catch (error) {
      console.error('Error al actualizar el director', error)
      throw error
    }
  }
}

export default directorService
