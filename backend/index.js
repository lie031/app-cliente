const express = require('express')
const { obtenerConexion } = require('./db/connect-mongo')

const app = express()
const puerto = 3000

obtenerConexion()
app.use(express.json())

app.use('/api/genero', require('./routes/genero'))
app.use('/api/director', require('./routes/director'))
app.use('/api/media', require('./routes/mediaRoute'))
app.use('/api/productora', require('./routes/productoraRoutes'))
app.use('/api/tipo', require('./routes/tipoRoute'))

app.listen(puerto, () => {
  console.log(`app corriendo en el puerto ${puerto}`)
})
