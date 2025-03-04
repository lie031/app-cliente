const mongoose = require('mongoose')

const DirectorEsquema = mongoose.Schema(
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
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Director', DirectorEsquema)
