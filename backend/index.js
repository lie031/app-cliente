const express = require('express')
const { obtenerConexion } = require('./db/connect-mongo')
const cors = require('cors')

const app = express()
const puerto = process.env.PORT

obtenerConexion()

const allowedOrigins = [
  'http://localhost:3000',
  'https://mi-react-app.onrender.com'
]

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

app.use(express.json())

app.use('/generos', require('./routes/genero'))
app.use('/directores', require('./routes/director'))
app.use('/medias', require('./routes/mediaRoute'))
app.use('/productoras', require('./routes/productoraRoutes'))
app.use('/tipos', require('./routes/tipoRoute'))

app.listen(puerto, () => {
  console.log(`app corriendo en el puerto ${puerto}`)
})
