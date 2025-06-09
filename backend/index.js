const express = require('express')
const { obtenerConexion } = require('./db/connect-mongo')
const cors = require('cors');

const app = express()
const puerto = process.env.PORT; // El puerto ahora se obtiene de .env

obtenerConexion() // Conectar a la base de datos

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET","POST","PUT","DELETE"]
}));

app.use(express.json()) // Habilitar el parseo de JSON en las solicitudes

// --- Agregando las nuevas rutas de usuarios ---
app.use('/api/users', require('./routes/userRoutes')) // Nueva ruta para el módulo de usuarios
// --- Fin de las nuevas rutas ---

app.use('/generos', require('./routes/genero'))
app.use('/directores', require('./routes/director'))
app.use('/medias', require('./routes/mediaRoute')) // Esta ruta ahora usará los middlewares de auth y authorize
app.use('/productoras', require('./routes/productoraRoutes'))
app.use('/tipos', require('./routes/tipoRoute'))

// Ruta de prueba para verificar que el servidor está corriendo
app.get('/', (req, res) => {
    res.send('API está funcionando correctamente!');
});

app.listen(puerto, () => {
    console.log(`App corriendo en el puerto ${puerto}`)
})
