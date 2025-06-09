const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UsuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        enum: ['ADMIN', 'USER'],
        default: 'ADMIN'
    },
    estado: {
        type: String,
        enum: ['Activo', 'Inactivo'],
        default: 'Activo'
    }
}, {
    timestamps: true
});

// Método para encriptar la contraseña antes de guardar
UsuarioSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Método para comparar contraseñas
UsuarioSchema.methods.compararPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Usuario', UsuarioSchema); 