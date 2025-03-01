const mongoose = require('mongoose')
require('dotenv').config()

const obtenerConexion = async () => {
  try {
    const url = process.env.URL_MONGO

    await mongoose.connect(url)

    console.log('conexion exitosa')
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  obtenerConexion
}
