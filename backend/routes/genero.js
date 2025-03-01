const express = require('express')
const Genero = require('../models/Genero')
const validator = require('express-validator')

const router = express.Router()

router.post('/', [
  validator.check('nombre', 'nombre invalido').not().isEmpty(),
  validator.check('estado', 'estado invalido').isIn(['activo', 'inactivo']),
  validator.check('descripcion', 'descripcion invalida').not().isEmpty()
], async (req, res) => {
  try {
    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()
      })
    }

    let genero = new Genero()
    genero.nombre = req.body.nombre
    genero.estado = req.body.estado
    genero.descripcion = req.body.descripcion

    genero = await genero.save()
    res.send(genero)
  } catch (error) {
    console.log(error)
    res.status(500).send('error en el servidor')
  }
})

router.get('/', async (req, res) => {
  try {
    const generos = await Genero.find()
    res.send(generos)
  } catch (error) {
    console.log(error)
    res.status(500).send('error en el servidor')
  }
})

router.get('/:nombre', async (req, res) => {
  try {
    const genero = await Genero.findOne({ nombre: req.params.nombre })
    res.send(genero)
  } catch (error) {
    console.log(error)
    res.status(500).send('error en el servidor')
  }
})

router.put('/:nombre', [
  validator.check('nombre', 'nombre invalido').not().isEmpty(),
  validator.check('estado', 'estado invalido').isIn(['activo', 'inactivo']),
  validator.check('descripcion', 'descripcion invalida').not().isEmpty()
], async (req, res) => {
  try {
    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()
      })
    }

    const genero = await Genero.findOneAndUpdate(
      { nombre: req.params.nombre },
      {
        $set: {
          nombre: req.body.nombre,
          estado: req.body.estado,
          descripcion: req.body.descripcion
        }
      },
      { new: true }
    )
    res.send(genero)
  } catch (error) {
    console.log(error)
    res.status(500).send('error en el servidor')
  }
})

router.delete('/:nombre', async (req, res) => {
  try {
    const genero = await Genero.findOneAndDelete({ nombre: req.params.nombre })
    res.send(genero)
  } catch (error) {
    console.log(error)
    res.status(500).send('error en el servidor')
  }
})

module.exports = router
