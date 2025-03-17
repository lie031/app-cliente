import React, {useState, useEffect} from "react";
import mediaService from "../Services/MediaService";
import { Navigate, NavLink, useNavigate } from "react-router-dom";


/**
 * Componente para mostrar una lista de medias
 * Utiliza el servicio de mediaService para obtener los datos del backend
 */

const MediaList = () => {

    //Estado para almacenar la lista de medias
    const [medias, setMedias] = useState([]);

    //Estado para manejar la carga de datos
    const [loading, setLoading] = useState(true);

    //Estado para manejar errores
    const [error, setError] = useState(null);

    //Manejo del Navigate
    const navigate = useNavigate();

    //Efecto para cargar las medias cuando el componente se monta
    useEffect(() => {

        //funcion para cargar las Medias
        const fetchMedias = async () => {
            try {
                setLoading(true);

                //Llamamos al metodo getAll del servicio
                const data = await mediaService.getAll();
                setMedias(data);
                setError(null);
            } catch (err) {
                console.error("Error al cargar las Medias: ", err);
                setError("No se pudieron cargar las medias, Por favor intenta nuevamente")
            } finally {
                setLoading(false);
            }
        };
        
        //Ejecutamos la funcion
        fetchMedias();
    },[]); //El array vacio asegura que esto solo se ejecute una vez al montar el componente

    const editMedia = (id) => {
        navigate(`/medias/${id}`);
    }

    //Funcion para eliminar una Media
    const deleteMedia = async (id) => {
        if (window.confirm("¿Seguro que deseas eliminar la Media?")) {
            try {
                await mediaService.delete(id);

                //Actualizamos la lista de Medias eliminando la media borrada
                setMedias(medias.filter(media => media._id !== id));
                
                alert('Media eliminada con exito');
            } catch (err) {
                console.error("Error al eliminar la  media", err);
                alert('Error al elimnar el usuario')
            }
        }
    };

    return (
        <div className="container mt-4"> {/* media-list-container*/}
            <h2 className="text-center">Lista de Medias</h2>

            {/* Mostrar mensaje de carga */}
            {loading && <p>Cargando Medias...</p>}

            {/* Mostrar mensaje de error si existe */}
            {error && <div className="error-message">{error}</div>}

            {/* Mostrar la lista de usuarios si hay un error y no esta cargando */}
            {!loading && !error && (
                <>
                {medias.length > 0 ? (
                    
                    <div className="table-responsive">
                        <NavLink to="/create" className="btn btn-success mb-3">Crear Nueva Media</NavLink>
                        <table className="table table-striped table-bordered table-hover"> {/* media-table */}
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th> 
                                    <th>Serial</th>
                                    <th>Titulo</th>
                                    <th>Sinopsis</th>
                                    <th>Url</th>
                                    <th>Img</th>
                                    <th>Estreno</th>
                                    <th>Genero</th>
                                    <th>Director</th>
                                    <th>Productora</th>
                                    <th>Tipo</th>
                                    <th>Fecha de Creacion</th>
                                    <th>Fecha de Actualizacion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {medias.map(media => (
                                    <tr key={media._id}>
                                        <td>{media._id}</td>
                                        <td>{media.serial}</td>
                                        <td>{media.titulo}</td>
                                        <td>{media.sinopsis}</td>
                                        <td><a href="{media.url}" target="_blank" rel="noopener noreferrer">Ver</a></td>
                                        <td><img src="{media.img}" alt={media.titulo} width="100"/></td>
                                        <td>{media.estreno}</td>
                                        <td>{media.genero?.nombre}</td>
                                        <td>{media.director?.nombre}</td>
                                        <td>{media.productora?.nombre}</td>
                                        <td>{media.tipo?.nombre}</td>
                                        <td>{media.createdAt}</td>
                                        <td>{media.updatedAt}</td>
                                        <td>
                                            <button className="view-btn" onClick={() => alert(`ver detalles de media ${media._id}`)}>
                                                Ver
                                            </button>
                                            <button className="edit-btn" onClick={() => editMedia(media._id)}>
                                                Editar
                                            </button>
                                            <button className="delete-btn" onClick={() => deleteMedia(media._id)}>
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No hay Medias disponibles</p>
                )}
                </>
            )}

        </div>
    );

};

export default MediaList;