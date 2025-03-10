const { Router, json } = require('express') // Importamos Router de express
const { validationResult, check } = require('express-validator') // Importamos express validator para los check
const Media = require('../models/Media') // Importamos las rutas de los Modulos
const Genero = require('../models/Genero')
const Director = require('../models/Director')
const Productora = require('../models/Productora')
const Tipo = require('../models/Tipo')

const router = Router() // Iniciamos el Router para crear las Api

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
router.get('/', async (req, res) => {
  // Creamos el metodo get con una funcion asincrona
  try {
    const medias = await Media.find() // Esperamos la respuesta de la base de datos para traer todos los documentos
      .populate('genero', 'nombre')
      .populate('director', 'nombre')
      .populate('productora', 'nombre')
      .populate('tipo', 'nombre')
    res.json(medias)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener los tipos de Medias' })
  }
})

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
router.post(
  '/', // Creamos el metodo post
  [
    check('serial', 'El campo serial es requerido').not().isEmpty(), // Checkeamos que los datos tengan los datos correctos
    check('titulo', 'El campo titulo es requerido').not().isEmpty(),
    check('sinopsis', 'El campo sinopsis es requerido').not().isEmpty(),
    check('url', 'El campo url es requerido').not().isEmpty(),
    check('img', 'El campo img es requerido').not().isEmpty(),
    check(
      'estreno',
      'El campo debe de tener una fecha valida (YYYY-MM-DD)'
    ).isISO8601(),
    check('genero', 'El campo genero es requerido').not().isEmpty(),
    check('director', 'El campo director es requerido').not().isEmpty(),
    check('productora', 'El campo productora es requerido').not().isEmpty(),
    check('tipo', 'El Campo Tipo es requerido').not().isEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req) // Guardamos las validaciones en una variable
      if (!errors.isEmpty()) {
        // Verificamos si hay algun error
        return res.status(400).json({ errors: errors.array() })
      }

      let {
        serial,
        titulo,
        sinopsis,
        url,
        img,
        estreno,
        genero,
        director,
        productora,
        tipo
      } = req.body // Creamos instancias de cada atributo

      estreno = new Date(estreno) // Asi actualizamos la fecha de estreno, pues esa es fijada

        //Verificamos que el genero exista y este activo
        const genderExist = await Genero.findOne({_id: genero, estado: 'Activo'});
        if (!genderExist) {
            return res.status(400).json({error: "El genero seleccionado no es valido o no esta Activo"});
        }

        //Verificar si el produtor existe o esta activo
        const productorExist = await Productora.findOne({_id: productora, estado: "Activo"});
        if (!productorExist) {
            return res.status(400).json({error: "la Productora seleccionado no es valido o no esta activo"});
        }

        //Verificamos que el director exista y este activo
        const directorExist = await Director.findOne({_id: director, estado: "Activo"});
        if (!directorExist) {
            return res.status(400).json({error: "El director seleccionado no es valido o no esta activo"});
        }

      // Verificamos que el tipo exista
      const tipoExist = await Tipo.findOne({ _id: tipo })
      if (!tipoExist) {
        return res
          .status(400)
          .json({ error: 'El tipo seleccionado no existe' })
      }

      const media = new Media({
        serial,
        titulo,
        sinopsis,
        url,
        img,
        estreno,
        genero,
        director,
        productora,
        tipo
      })

      await media.save() // Esperamos a que la base de datos guarde el documento
      res.status(201).json(media) // Devolvemos un codigo de estado y los datos guardados
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error a Guardar la Media' })
    }
  }
)
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
router.put(
  '/:id', // Creamos el metodo put para actualizar, este metodo lleva un argumento id
  [
    check('serial', 'El campo serial es requerido').not().isEmpty(),
    check('titulo', 'El campo titulo es requerido').not().isEmpty(),
    check('sinopsis', 'El campo sinopsis es requerido').not().isEmpty(),
    check('url', 'El campo url es requerido').not().isEmpty(),
    check('img', 'El campo img es requerido').not().isEmpty(),
    check('estreno','El campo debe de tener una fecha valida (YYYY-MM-DD)').isISO8601(),
    check('genero', 'El campo genero es requerido').not().isEmpty(),
    check('director', 'El campo director es requerido').not().isEmpty(),
    check('productora', 'El campo productora es requerido').not().isEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req) // Guardamos las validaciones
      if (!errors.isEmpty()) {
        // Verificamos si hay errores
        return res.status(400).json({ errors: errors.array() })
      }

      let {
        genero,
        productora,
        director,
        tipo
      } = req.body

      //Verificamos que el genero exista y este activo
      const genderExist = await Genero.findOne({_id: genero, estado: 'Activo'});
      if (!genderExist) {
          return res.status(400).json({error: "El genero seleccionado no es valido o no esta Activo"});
      }

      //Verificar si el produtor existe o esta activo
      const productorExist = await Productora.findOne({_id: productora, estado: "Activo"});
      if (!productorExist) {
          return res.status(400).json({error: "la Productora seleccionado no es valido o no esta activo"});
      }

      //Verificamos que el director exista y este activo
      const directorExist = await Director.findOne({_id: director, estado: "Activo"});
      if (!directorExist) {
          return res.status(400).json({error: "El director seleccionado no es valido o no esta activo"});
      }

            let media = await Media.findById(req.params.id);     //Creamos una variable que espere la busqueda de un elemento de la db
            if (!media) {
                return res.send("La Media no existe");
            }
            
            media = await Media.findByIdAndUpdate(               //Si la encuentra, esperamos los datos y los actualizamos con una funcion mas rapida
                req.params.id,{
                    serial: req.body.serial,
                    titulo: req.body.titulo,
                    sinopsis: req.body.sinopsis,
                    url: req.body.url,
                    img: req.body.img,
                    estreno: req.body.estreno,
                    genero: req.body.genero,
                    director: req.body.director,
                    productora: req.body.productora,
                    tipo: req.body.tipo     
                },
                {new: true}                                      //Devuelve nuestra media actualizada
            );

      res.json(media) // Devolvemos la media actualizada en formato json
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error al actualizar la Media' })
    }
  }
);
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
router.delete(
  '/:id', // Creamos un metodo delete con el argumento id pues necesitamos saber que elemento eliminar
  async (req, res) => {
    try {
      const media = await Media.findById(req.params.id) // Esperamos a que la base de datos responda con el documento
      if (!media) {
        return res.status(404).json({ msg: 'La media no existe' })
      }

      await Media.findByIdAndDelete(req.params.id) // Si lo encuentra lo eliminamos con la funcion rapida findByIdAndDelete
      res.json({ msg: 'MEdia eliminada de manera exitosa' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error al eliminar la Media' })
    }
  }
)

module.exports = router // Exportamos nuestro router para utilizar la ruta en el index
