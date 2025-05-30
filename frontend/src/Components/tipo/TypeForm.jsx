import React, {use, useEffect, useState} from "react";
import typeService from "../../Services/TypeService";
import { useNavigate, useParams,NavLink } from "react-router-dom";


//Declaramos el componente funcional llamado CreateMedia
const TypeForm = () => {

    const {_id} = useParams();
    const navigate = useNavigate();

    /**
     * Creamos un estado llamado formData, inicializado con un objeto que contiene
     * todos los campos del formulario vacios.
     * setFormData es la funcion que usa para actualizar el estado del formulario
     */
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
    });

    useEffect(() => {
        if (_id) {
            const cargarTipo = async () => {
                try {
                    const data = await typeService.getById(_id);
                    console.log("Datos del tipo en CONSOLA: " + data);
                    if (data && typeof data === "object") {
                        setFormData({
                        nombre: data.nombre || '',
                        descripcion: data.descripcion || ''
                        });
                    }
                } catch (err) {
                    console.error("Error al cargar el tipo: ", err);
                }
            };
            cargarTipo();
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
                await typeService.update(_id,formData);
                alert('Tipo actualizado con exito');
            }else {
                await typeService.create(formData);
                alert('Tipo creado con exito');
            }
            navigate('/tipos');
        } catch (err) {
            console.error("Error al Guardar el tipo: ", err);
            alert('Error al guardar el tipo');
        }
    };

    //Renderizamos el Componente
    return (
        <div className="container my-4">

            <div className="card shadow-lg">

                <div className="card-header bg-primary text-white">
                    <h2 className="text-center mb-0">{_id ? 'Editar Tipo' : 'Crear Tipo'}</h2>
                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>
                        <div className="row">
                        {Object.keys(formData).map((key) => (
                                <div key={key} className="col-md-6 mb-3">
                                    <label className="form-label text-capitalize">{key}</label>
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
                        </div>
                        <div className="d-flex justify-content-around ">
                            
                            <NavLink to={'/tipos'} className="btn btn-danger w-50">Regresar</NavLink>
                            
                            <button type="submit" className="btn btn-success w-50">
                                {_id ? 'Actualizar': 'Crear'}
                            </button>
                        </div>
                    </form>

                </div>

            </div>
           
        </div>
    );
};

export default TypeForm;