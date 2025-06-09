const User = require('../models/User');
const jwt = require('jsonwebtoken'); // Importar jsonwebtoken para generar tokens

// @desc    Registrar un nuevo usuario
// @route   POST /api/users/register
// @access  Público
exports.registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Verificar si el usuario ya existe por email
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'El usuario con este email ya existe' });
        }

        // Crear una nueva instancia de usuario
        user = new User({
            name,
            email,
            password, // La contraseña será encriptada por el middleware pre-save del modelo User.js
            role: role || 'general' // Asignar el rol proporcionado, o 'general' por defecto
        });

        await user.save(); // Guardar el usuario en la base de datos

        // Generar un token JWT para el nuevo usuario (para iniciar sesión automáticamente después del registro)
        const payload = {
            user: {
                id: user.id,
                role: user.role // Incluir el rol en el token para futura autorización
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET, // Usar el secreto JWT de las variables de entorno
            { expiresIn: '1h' }, // El token expira en 1 hora (puedes ajustar esto)
            (err, token) => {
                if (err) throw err;
                res.status(201).json({ msg: 'Usuario registrado exitosamente', token });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor al registrar usuario');
    }
};

// @desc    Autenticar un usuario y obtener un token (servicio de inicio de sesión)
// @route   POST /api/users/login
// @access  Público
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar si el usuario existe por email
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        // Comparar la contraseña proporcionada con la contraseña encriptada almacenada
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        // Si las credenciales son válidas, crear y devolver un token JWT
        const payload = {
            user: {
                id: user.id,
                role: user.role // Incluir el rol en el token
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token }); // Devolver el token al cliente
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor al intentar iniciar sesión');
    }
};

// @desc    Obtener el perfil del usuario autenticado
// @route   GET /api/users/me
// @access  Privado (requiere token)
exports.getMe = async (req, res) => {
    try {
        // req.user.id viene del payload del JWT decodificado por el middleware 'auth'
        const user = await User.findById(req.user.id).select('-password'); // Excluir la contraseña del resultado
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor al obtener perfil');
    }
};

// @desc    Obtener todos los usuarios (solo para administradores)
// @route   GET /api/users
// @access  Privado (solo rol 'administrador')
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Excluir contraseñas
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor al obtener usuarios');
    }
};