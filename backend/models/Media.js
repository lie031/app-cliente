const { Schema, model } = require('mongoose') // Importamos la libreria mongoose

const SchemaMedia = new Schema(
  {
    // Creamos un nuevo esquema
    serial: { type: String, required: true, unique: true },
    titulo: { type: String, required: true },
    sinopsis: { type: String, required: true },
    url: { type: String, required: true, unique: true },
    img: { type: String, required: true },
    estreno: { type: Date, required: true },
    genero: { type: Schema.Types.ObjectId, ref: 'Genero', required: true },
    director: { type: Schema.Types.ObjectId, ref: 'Director', required: true },
    productora: {
      type: Schema.Types.ObjectId,
      ref: 'Productora',
      required: true
    },
    tipo: { type: Schema.Types.ObjectId, ref: 'Tipo', required: true }
  },
  { timestamps: true }
)

module.exports = model('Media', SchemaMedia) // Exportamos el esquema para poder usarlo en otros archivos
