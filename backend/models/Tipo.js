const {Schema, model} = require('mongoose');            //Importamos la libreria mongoose

const SchemaTipo = new Schema({                        //Creamos un nuevo esquema
    nombre: {type: String, required: true, unique: true},
    fechaCreacion: {type: Date, required: true},
    fechaActualizacion: {type: Date, required: true},
    descricion: {type: String, required: true, unique: true},
},{timestamps: true});

module.exports = model("Tipo",SchemaTipo);            //Exportamos el esquema