const mongoose = require("mongoose");

const ProductoraSchema = new mongoose.Schema({
    nombre: {type: String, required: true, unique: true},
    estado: {type: String, enum: ["Activo", "Inactivo"], default: "Activo"},
    fecha_creacion: {type: Date, default: Date.now},
    fecha_actualizacion: {type: Date, default: Date.now},
    slogan: {type: String, required: true},
    descripcion: {type: String, required: true}
})

module.exports = mongoose.model("Productora", ProductoraSchema);