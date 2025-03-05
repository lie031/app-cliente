const mongoose = require('mongoose')

const GeneroEsquema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      unique: true
    },
    estado: {
      type: String,
      required: true,
      enum: ['activo', 'inactivo']
    },
    descripcion: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Genero', GeneroEsquema)
