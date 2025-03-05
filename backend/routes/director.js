const express = require('express')
const Director = require('../models/Director')
const validator = require('express-validator')

const router = express.Router()

router.post(
  '/',
  [
    validator.check('nombre', 'nombre invalido').not().isEmpty(),
    validator.check('estado', 'estado invalido').isIn(['Activo', 'Inactivo'])
  ],
  async (req, res) => {
    try {
      const errors = validator.validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: errors.array()
        })
      }

      const { nombre, estado } = req.body
      if (!nombre || !estado) {
        return res.status(400).send('Nombre y estado son requeridos')
      }

      let director = new Director({ nombre, estado })
      director = await director.save()

      if (!director) {
        return res.status(500).send('Error al guardar el director')
      }

      res.status(201).send(director)
    } catch (error) {
      console.error(error)
      res.status(500).send('Error en el servidor')
    }
  }
)

router.get('/', async (req, res) => {
  try {
    const directores = await Director.find().exec()
    if (!directores) {
      return res.status(404).send('No se encontraron directores')
    }
    res.send(directores)
  } catch (error) {
    console.log(error)
    res.status(500).send('error en el servidor')
  }
})

router.get('/:id', async (req, res) => {
  try {
    const director = await Director.findById(req.params.id)
    if (!director) {
      return res.status(404).send('Director no encontrado')
    }
    res.send(director)
  } catch (error) {
    console.log(error)
    res.status(500).send('error en el servidor')
  }
})

router.put(
  '/:id',
  [
    validator.check('nombre', 'nombre invalido').not().isEmpty(),
    validator.check('estado', 'estado invalido').isIn(['Activo', 'Inactivo'])
  ],
  async (req, res) => {
    try {
      const errors = validator.validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: errors.array()
        })
      }

      const director = await Director.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            nombre: req.body.nombre,
            estado: req.body.estado
          }
        },
        { new: true }
      )

      if (!director) {
        return res.status(404).send('Director no encontrado')
      }

      res.send(director)
    } catch (error) {
      console.log(error)
      res.status(500).send('error en el servidor')
    }
  }
)

router.delete('/:id', async (req, res) => {
  try {
    const director = await Director.findByIdAndDelete(req.params.id)
    if (!director) {
      return res.status(404).send('Director no encontrado')
    }
    res.send(director)
  } catch (error) {
    console.log(error)
    res.status(500).send('error en el servidor')
  }
})

module.exports = router
