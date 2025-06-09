const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, getAllUsers } = require('../controllers/userController');
const auth = require('../middleware/auth'); // Middleware para verificar el token
const authorize = require('../middleware/authorize'); // Middleware para verificar el rol

// Rutas de autenticación
router.post('/register', registerUser); // Ruta para registrar nuevos usuarios
router.post('/login', loginUser);       // Ruta para iniciar sesión y obtener JWT

// Rutas protegidas
router.get('/me', auth, getMe); // Obtener el perfil del usuario autenticado (requiere token)

// Rutas de administración (solo acceso para 'administrador')
router.get('/', auth, authorize(['administrador']), getAllUsers); // Obtener todos los usuarios


module.exports = router;