const express = require('express')
const { obtenerConexion } = require('./db/connect-mongo')
const cors = require('cors')
require('dotenv').config()

const app = express()
const puerto = process.env.PORT || 3000

// Verificar que exista la variable JWT_SECRET
if (!process.env.JWT_SECRET) {
    console.error('Error: JWT_SECRET no está definido en las variables de entorno');
    process.exit(1);
}

obtenerConexion()

const allowedOrigins = [
  'http://localhost:3000',
  'https://app-frontend-nes3.onrender.com'
]

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))

app.use(express.json())

// Middleware para logging de peticiones
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    console.log('Body:', req.body);
    next();
});

// Rutas de autenticación
app.use('/api/auth', require('./routes/auth'))

// Rutas protegidas
app.use('/api/generos', require('./routes/genero'))
app.use('/api/directores', require('./routes/director'))
app.use('/api/medias', require('./routes/mediaRoute'))
app.use('/api/productoras', require('./routes/productoraRoutes'))
app.use('/api/tipos', require('./routes/tipoRoute'))

// Middleware para manejo de errores
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        msg: 'Error en el servidor',
        error: err.message
    });
});

app.listen(puerto, () => {
  console.log(`app corriendo en el puerto ${puerto}`)
})
