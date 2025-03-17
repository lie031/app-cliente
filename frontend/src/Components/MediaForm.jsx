import React, {use, useEffect, useState} from "react";
import mediaService from "../Services/MediaService";
import { useNavigate, useParams } from "react-router-dom";


//Declaramos el componente funcional llamado CreateMedia
const MediaForm = () => {

    const {_id} = useParams();
    const navigate = useNavigate();

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
        genero: [],
        director: '',
        productora: '',
        tipo: ''
    });

    useEffect(() => {
        if (_id) {
            const cargarMedia = async () => {
                try {
                    const data = await mediaService.getById(_id);
                    console.log("Datos de la Media en CONSOLA: " + data);
                    if (data && typeof data === "object") {
                        setFormData({
                        serial: data.serial || '',
                        titulo: data.titulo || '',
                        sinopsis: data.sinopsis || '',
                        url: data.url || '',
                        img: data.img || '',
                        estreno: data.estreno || '',
                        genero: data.genero || [],
                        director: data.director || '',
                        productora: data.productora || '',
                        tipo: data.tipo || ''
                        });
                    }
                } catch (err) {
                    console.error("Erro al cargar la Media: ", err);
                }
            };
            cargarMedia();
        }
    }, [_id]);
    
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

        try {
            if (_id) {
                await mediaService.update(_id,formData);
                alert('Media Actualizada con exito');
            }else {
                await mediaService.create(formData);
                alert('Media Creada con exito');
            }
            navigate('/');
        } catch (err) {
            console.error("Error al Guardar la Media: ", err);
            alert('Error al guardar la media');
        }
    };

    //Renderizamos el Componente
    return (
        <div className="container">
            <h2>{_id ? 'Editar Media' : 'Crear Media'}</h2>
            <form onSubmit={handleSubmit}>
                {Object.keys(formData).map((key) => (
                    <div key={key} className="form-group mb-3">
                        <label>{key}</label>
                        <input type="text" 
                        name={key} 
                        value={ typeof formData[key] === "object" && formData[key] !== null
                            ? formData[key]._id || ''
                            : formData[key] || ''
                        }
                        onChange={handleChange}
                        className="form-control"
                        />
                    </div>
                ))}
                <button type="submit" className="btn btn-primary">{_id ? 'Actualizar': 'Crear'}</button>
            </form>
        </div>
    );
};

export default MediaForm;