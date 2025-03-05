const express = require("express");
const Tipo = require('../models/Tipo');
const validator = require('express-validator');

const router = express.Router();

router.post('/', [
  validator.check('nombre', 'nombre invalido').not().isEmpty(),
  validator.check('descripcion', 'descripción invalida').not().isEmpty()
], async (req, res) => {
  try {
    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()
      })
    }

    let tipo = new Tipo()
    tipo.nombre = req.body.nombre
    tipo.descripcion = req.body.descripcion

    tipo = await tipo.save()
    res.send(tipo)
  } catch (error) {
    console.log(error)
    res.status(500).send('error en el servidor')
  }
})

router.get('/', async (req, res) => {
  try {
    const tipos = await Tipo.find()
    res.send(tipos)
  } catch (error) {
    console.log(error)
    res.status(500).send('error en el servidor')
  }
})

router.get('/:nombre', async (req, res) => {
  try {
    const tipo = await Tipo.findOne({ nombre: req.params.nombre })
    res.send(tipo)
  } catch (error) {
    console.log(error)
    res.status(500).send('error en el servidor')
  }
})

router.put('/:nombre', [
  validator.check('nombre', 'nombre invalido').not().isEmpty(),
  validator.check('descripcion', 'descripcion invalida').not().isEmpty()
], async (req, res) => {
  try {
    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()
      })
    }

    const tipo = await Tipo.findOneAndUpdate(
      { nombre: req.params.nombre },
      {
        $set: {
          nombre: req.body.nombre,
          descripcion: req.body.descripcion
        }
      },
      { new: true }
    )
    res.send(tipo)
  } catch (error) {
    console.log(error)
    res.status(500).send('error en el servidor')
  }
})

router.delete('/:nombre', async (req, res) => {
  try {
    const tipo = await Tipo.findOneAndDelete({ nombre: req.params.nombre })
    res.send(tipo)
  } catch (error) {
    console.log(error)
    res.status(500).send('error en el servidor')
  }
})

module.exports = router