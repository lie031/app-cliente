import React, {use, useEffect, useState} from "react";
import mediaService from "../Services/MediaService";
import { useNavigate, useParams,NavLink } from "react-router-dom";


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

    //Opciones para los Select
    const [generos, setGeneros] = useState([]);
    const [directores, setDirectores] = useState([]);
    const [productoras, setProductoras] = useState([]);
    const [tipos, setTipos] = useState([]);

    useEffect(() => {
        const cargarOpciones = async () => {
            try {
                
                const tiposData = await mediaService.getTipos();
                const generosData = await mediaService.getGeneros();
                const directoresData = await mediaService.getDirectores();
                const productorasData = await mediaService.getProductoras();
                
                setGeneros(generosData);
                setDirectores(directoresData);
                setProductoras(productorasData);
                setTipos(tiposData);
            } catch (error) {
                console.error("Error al cargar las opciones");
            }
        };
        cargarOpciones();
    },[])

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
                        estreno: data.estreno ? new Date(data.estreno).toISOString().split("T")[0] : 0,
                        genero: data.genero?._id || '',
                        director: data.director?._id || '',
                        productora: data.productora?._id || '',
                        tipo: data.tipo?._id || ''
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
    let handleSubmit = async (e) => {
        //Esto evitara que el formulario se recargue al enviarse
        e.preventDefault();

        //Convierto los objetos a solo ID antes de enviar
        const mediaToSend = {
            serial: formData.serial,
            titulo: formData.titulo,
            sinopsis: formData.sinopsis,
            url: formData.url,
            img: formData.img,
            estreno: new Date(formData.estreno).toISOString(),
            genero: typeof formData.genero === "object" ? formData.genero._id : formData.genero,
            director: typeof formData.director === "object" ? formData.director._id : formData.director,
            productora: typeof formData.productora === "object" ? formData.productora._id : formData.productora,
            tipo: typeof formData.tipo === "object" ? formData.tipo._id : formData.tipo,
        };
        console.log("Datos enviados al backend:", JSON.stringify(mediaToSend, null, 2));

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
            alert('Error al guardar la media', err);
        }
    };
    
    console.log("Generos:", generos);
    console.log("Directores:", directores);
    console.log("Productoras:", productoras);
    console.log("Tipos:", tipos);
    return (
        <div className="container my-4">

            <div className="card shadow-lg">

                <div className="card-header bg-primary text-white">
                    <h2 className="text-center mb-0">{_id ? 'Editar Media' : 'Crear Media'}</h2>
                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="row">
                            {Object.keys(formData).map((key) => {
                                let inputType = "text";
                                if (key === "estreno") inputType = "date";

                                return(
                                    <div key={key} className="col-md-6 mb-3">
                                        <label className="form-label text-capitalize">{key}</label>
                                        {["genero","director","productora","tipo"].includes(key) ? (
                                            <select 
                                            
                                            name={key}
                                            value={formData[key] || ""}
                                            onChange={(e) => setFormData({...formData, [key]: e.target.value})}
                                            className="form-control"
                                            >
                                                <option value="">Seleccione {key}</option>

                                                {key === "tipo" && tipos.map((item) => (
                                                    <option key={item._id} value={item._id}>
                                                        {item.nombre}
                                                    </option>
                                                ))}

                                                {key === "genero" && generos.map((item) => (
                                                    <option key={item._id} value={item._id}>
                                                        {item.nombre + " - " + item.estado}
                                                    </option>
                                                ))}

                                                {key === "director" && directores.map((item) => (
                                                    <option key={item._id} value={item._id}>
                                                        {item.nombre + " - " + item.estado}
                                                    </option>
                                                ))}

                                                {key === "productora" && productoras.map((item) =>(
                                                    <option key={item._id} value={item._id}>
                                                        {item.nombre + " - " + item.estado}
                                                    </option>
                                                ) )}

                                            </select>
                                        ) : (
                                            <input 
                                                type={inputType} 
                                                name={key} 
                                                value={formData[key] || ""}
                                                onChange={handleChange}
                                                className="form-control" 
                                                />
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                            <div className="d-flex justify-content-around">
                                <NavLink to={'/medias'} className="btn btn-danger w-50">Regresar</NavLink>
                                <button type="submit" className="btn btn-success w-50">
                                    {_id ? 'Actualizar' : 'Crear '}
                                </button>
                            </div>
                    </form>

                </div>

            </div>
           
        </div>
    );
 
};

export default MediaForm;