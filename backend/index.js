const express = require('express')
const { obtenerConexion } = require('./db/connect-mongo')

const app = express()
const puerto = 3000

obtenerConexion()
app.use(express.json())

app.use('/generos', require('./routes/genero'))
app.use('/directores', require('./routes/director'))
app.use('/medias', require('./routes/mediaRoute'))
app.use('/productoras', require('./routes/productoraRoutes'))
app.use('/tipos', require('./routes/tipoRoute'))

app.listen(puerto, () => {
  console.log(`app corriendo en el puerto ${puerto}`)
})
