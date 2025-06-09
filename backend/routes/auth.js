const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');
const { verificarToken } = require('../middleware/auth');

// @route   POST api/auth/registro
// @desc    Registrar usuario
// @access  Public
router.post(
    '/registro',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Por favor incluye un email válido').isEmail(),
        check('password', 'Por favor ingresa una contraseña con 6 o más caracteres').isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { nombre, email, password } = req.body;

        try {
            let usuario = await Usuario.findOne({ email });

            if (usuario) {
                return res.status(400).json({ msg: 'El usuario ya existe' });
            }

            usuario = new Usuario({
                nombre,
                email,
                password
            });

            await usuario.save();

            const payload = {
                usuario: {
                    id: usuario.id,
                    rol: usuario.rol
                }
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '24h' },
                (error, token) => {
                    if (error) throw error;
                    res.json({ token });
                }
            );
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Error en el servidor');
        }
    }
);

// @route   POST api/auth/login
// @desc    Autenticar usuario y obtener token
// @access  Public
router.post(
    '/login',
    [
        check('email', 'Por favor incluye un email válido').isEmail(),
        check('password', 'La contraseña es requerida').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let usuario = await Usuario.findOne({ email });

            if (!usuario) {
                return res.status(400).json({ msg: 'Credenciales inválidas' });
            }

            if (usuario.estado === 'Inactivo') {
                return res.status(400).json({ msg: 'Usuario inactivo' });
            }

            const passwordValido = await usuario.compararPassword(password);

            if (!passwordValido) {
                return res.status(400).json({ msg: 'Credenciales inválidas' });
            }

            const payload = {
                usuario: {
                    id: usuario.id,
                    rol: usuario.rol
                }
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '24h' },
                (error, token) => {
                    if (error) throw error;
                    res.json({ token });
                }
            );
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Error en el servidor');
        }
    }
);

// @route   GET api/auth/usuario
// @desc    Obtener usuario autenticado
// @access  Private
router.get('/usuario', verificarToken, async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.json(usuario);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error en el servidor');
    }
});

module.exports = router; 