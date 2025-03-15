import React, {useState} from "react";
import mediaService from "../Services/MediaService";

//Declaramos el componente funcional llamado CreateMedia
const CreateMedia = () => {
    /**
     * Creamos un estado llamado formData, inicializado con un objeto que contiene
     * todos los campos del formulario vacios.
     * setFormData es la funcion que usa para actualizar el estado del formulario
     */
    const [formData, setFormData] = useState({
        serial: '',
        titulo: '',
        sinopsis: '',
        url: '',
        img: '',
        estreno: '',
        genero: '',
        director: '',
        productora: '',
        tipo: ''
    });

    //Creamos otro estado para almacenar mensajes (de exito o de error) - inicialmente vacio
    const [message, setMessage] = useState('');

    /**
     * Esta funcion se ejecuta cuando hay cambios en los campos del formulario
     * Utilizamos una desestructuracion para obtener el nombre (name) y el valor (value) del campo que activo el evento
     * Actualizamos el estado formData sin perder los valores anteriores (gracias a ...formData), solo cambia el campo que ha sido modificado
     */
    const handleChange = (e) => {
        const {name, value} = e.target; //Desestructuracion donde se extrae las propiedades name y value, del elemento que hace ocurrir el evento
                                        //e.target corresponde al campo de entrada input que el usuario esta ingresando
        setFormData({...formData, [name]: value});
    };

    //Creamos un Manejador de envio de formulario
    const handleSubmit = async (e) => {
        //Esto evitara que el formulario se recargue al enviarse
        e.preventDefault();
        /**
         * LLamamos al servicio create de mediaService y le pasamos los datos del formulario
         * Si la creacion es exitosa, actualizamos el estado del mensaje con un texto de exito
         */
        try {
            await mediaService.create(formData);
            setMessage("Media creada Exitosamente");
            //Limpia o Reinicia el Formulario despues del exito
            setFormData({ 
                serial: '',
                titulo: '',
                sinopsis: '',
                url: '',
                img: '',
                estreno: '',
                genero: '',
                director: '',
                productora: '',
                tipo: ''
            })
        /**
         * Capturamos cualquier error durante el proceso de creacion
         * Muestra un mensaje de error en la consola y actualiza el estado del mensaje
         */
        } catch (error) {
            console.error('Error al crear la Media:', error);
            setMessage('Hubo un error al crear la Media');
        }
    };

    //Renderizamos el Componente
    return (

        /**
         * Devolvemos el contenido de JSX para renderizar el componente
         * Mostramos un mensaje si existe 
         */
        <div className="container mt-4">
            <h2 className="text-center">Crear Nueva Media</h2>
            {message && <p>{message}</p>} {/* Mostrar mensajes */}

            {/**
             * Formulario Dinamico
             * El formulario genera automaticamente los campos a partir de las claves del objeto formData
             * 
             * Para cada Campo:
             * Creara una etiquete label con el nombre capitalizado
             * Creara un campo input de tipo texto
             * El nombre del campo coincidira con el nombre de la propiedad en el estado
             * El valor del campo se toma del estado
             * la funcion onChange se activa cuando el usuario cambia el valor
             */}
            <form onSubmit={handleSubmit}>
                {/* Generar campos del formulario */}
                {Object.keys(formData).map((key) => (
                    <div className="mb-3" key={key}>
                        <label className="form-label">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                        <input
                            type="text"
                            className="form-control"
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                        />
                    </div>
                ))}
                {/**
                 * Renderizamos el boton de tipo submit el cual enviara el formulario al hacer click en el
                 */}
                <button type="submit" className="btn btn-primary">Crear Media</button>
            </form>
        </div>
    );
};

export default CreateMedia;