const Productora = require('../models/Productora')

// Crear productoras
exports.createProductora = async (req, res) => {
  try {
    const nuevaProductora = new Productora(req.body)
    const guardarProductora = await nuevaProductora.save()
    res.status(201).json(guardarProductora)
  } catch (error) {
    res.status(400).json({ message: 'Error creando la productora', error })
  }
}

// Ver productoras
exports.getProductoras = async (req, res) => {
  try {
    const productoras = await Productora.find()
    res.json(productoras)
  } catch (error) {
    res.status(500).json({ message: 'Error al encontrar las productoras', error })
  }
}

// Actualizar productoras
exports.updateProductora = async (req, res) => {
    try{
        const actualizarProductora = await Productora.findByIdAndUpdate(
            req.params.id, 
            req.body,
            {new: true}
        );
        res.json(actualizarProductora);
    }
    catch (error) {
        res.status(400).json({error: "Error al actualizar la productora"});
    }
}

// Borrar productoras
exports.deleteProductora = async (req, res) => {
  try {
    await Productora.findByIdAndDelete(req.params.id)
    res.json({ message: 'Productora eliminada' })
  } catch (error) {
    res.status(400).json({ message: 'Error al borrar la productora' }, error)
  }
}
