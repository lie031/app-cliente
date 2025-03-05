const express = require('express')
const Genero = require('../models/Genero')
const validator = require('express-validator')

const router = express.Router()

router.post(
  '/',
  [
    validator.check('nombre', 'nombre invalido').not().isEmpty(),
    validator.check('estado', 'estado invalido').isIn(['Activo', 'Inactivo']),
    validator.check('descripcion', 'descripcion invalida').not().isEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validator.validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: errors.array()
        })
      }

      // Verificar que el genero no exista
      const generoExist = await Genero.findOne({ nombre: req.body.nombre })
      if (generoExist) {
        return res.status(400).json({
          message: 'El genero ya existe'
        })
      }

      const genero = new Genero({
        nombre: req.body.nombre,
        estado: req.body.estado,
        descripcion: req.body.descripcion
      })

      await genero.save()
      res.send(genero)
    } catch (error) {
      console.error(error)
      res.status(500).send('error en el servidor')
    }
  }
)

router.get('/', async (req, res) => {
  try {
    const generos = await Genero.find()
    if (!generos) {
      return res.status(404).send('Generos no encontrados')
    }
    res.send(generos)
  } catch (error) {
    console.error(error)
    res.status(500).send('error en el servidor')
  }
})

router.get('/:id', async (req, res) => {
  try {
    const genero = await Genero.findById(req.params.id)
    if (!genero) {
      return res.status(404).send('Genero no encontrado')
    }
    res.send(genero)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error en el servidor')
  }
})

router.put(
  '/:id',
  [
    validator.check('nombre', 'nombre invalido').not().isEmpty(),
    validator.check('estado', 'estado invalido').isIn(['Activo', 'Inactivo']),
    validator.check('descripcion', 'descripcion invalida').not().isEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validator.validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: errors.array()
        })
      }

      const genero = await Genero.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            nombre: req.body.nombre,
            estado: req.body.estado,
            descripcion: req.body.descripcion
          }
        },
        { new: true }
      )
      if (!genero) {
        return res.status(404).send('Genero no encontrado')
      }
      res.send(genero)
    } catch (error) {
      console.log(error)
      res.status(500).send('error en el servidor')
    }
  }
)

router.delete('/:id', async (req, res) => {
  try {
    const genero = await Genero.findByIdAndDelete(req.params.id)
    if (!genero) {
      return res.status(404).send('Genero no encontrado')
    }
    res.send(genero)
  } catch (error) {
    console.log(error)
    res.status(500).send('Error en el servidor')
  }
})

module.exports = router
