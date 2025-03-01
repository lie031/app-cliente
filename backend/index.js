const express = require('express')
const { obtenerConexion } = require('./db/connect-mongo')

const app = express()
const puerto = 3000

obtenerConexion()
app.use(express.json())

app.use('/api/genero', require('./routes/genero'))
app.use('/api/director', require('./routes/director'))

app.listen(puerto, () => {
  console.log(`app corriendo en el puerto ${puerto}`)
})
