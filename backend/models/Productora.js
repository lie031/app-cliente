const mongoose = require("mongoose");

const ProductoraSchema = new mongoose.Schema({
    nombre: {type: String, required: true, unique: true},
    estado: {type: String, enum: ["Activo", "Inactivo"], default: "Activo"},
    slogan: {type: String, required: true},
    descripcion: {type: String, required: true}
},{timestamps: true});

module.exports = mongoose.model("Productora", ProductoraSchema);