import axiosInstance from './api'

const generoService = {
  getAll: async () => {
    try {
      // Almacenamos la respuesta de la base de datos con la solicitud get
      const response = await axiosInstance.get('/generos')
      // Retornamos los datos obtenidos mediante la URL
      return response.data
    } catch (error) {
      // Imprimimos el Error obtenido
      console.error('Error al obtener los generos: ', error)
      throw error
    }
  },
  getById: async (_id) => {
    try {
      const response = await axiosInstance.get(`/generos/${_id}`)
      return response.data
    } catch (error) {
      console.error('Error al obtener el genero con el id', error)
      throw error
    }
  },
  create: async (generoData) => {
    try {
      // Almacenamos el proceso que se hara en la base de datos mediante el metodo POST, utilizando el parametro mediaData para enviar los datos del objeto
      const response = await axiosInstance.post('/generos', generoData)
      // Retornamos los datos que se generan
      return response.data
    } catch (error) {
      console.error('Error al crear el genero: ', error)
      throw error
    }
  },
  update: async (_id, generoData) => {
    try {
      /**
       * Almacenaremos el proceso que se realizara a la base de datos mediante la URL con el metodo PUT
       * Definimos el ID de la Media a actualizar
       * Utilizamos el Parametro mediaData para Enviar los Datos que se usaran
       */
      const response = await axiosInstance.put(`/generos/${_id}`, generoData)

      // Retornamos los datos que se crearon
      return response.data
    } catch (error) {
      console.error('Error al actualizar el genero', error)
      throw error
    }
  },
  delete: async (_id) => {
    try {
      /**
       * Almacenamos el Proceso que se hara en la base de datos mediante la URL
       * Utilizamos el ID como parametro para elegir que Media eliminar de la DB
       */
      const response = await axiosInstance.delete(`/generos/${_id}`)

      // Retornamos los datos actualizados de la DB
      return response.data
    } catch (error) {
      console.error('Error al eliminar el genero', error)
      throw error
    }
  }
}

export default generoService
