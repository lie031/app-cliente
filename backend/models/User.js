const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Importar bcryptjs para encriptación de contraseñas

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Asegurar que el email sea único
        lowercase: true // Almacenar emails en minúsculas
    },
    password: { // Campo para la contraseña
        type: String,
        required: true
    },
    role: { // Campo para el rol del usuario
        type: String,
        required: true,
        enum: ['administrador', 'general'], // Roles permitidos
        default: 'general' // Rol por defecto si no se especifica
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    dateUpdated: {
        type: Date,
        default: Date.now
    }
});

// Middleware pre-save de Mongoose para encriptar la contraseña antes de guardar
UserSchema.pre('save', async function(next) {
    // Solo encriptar la contraseña si ha sido modificada (o es nueva)
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10); // Generar un "salt" (cadena aleatoria)
        this.password = await bcrypt.hash(this.password, salt); // Encriptar la contraseña
        next();
    } catch (err) {
        next(err); // Pasar el error al siguiente middleware de Express
    }
});

// Método para comparar contraseñas (útil en el login)
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
