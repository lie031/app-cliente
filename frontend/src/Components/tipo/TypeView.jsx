import React, {useState, useEffect} from "react";
import typeService from "../../Services/TypeService";
import { useNavigate, useParams,NavLink } from "react-router-dom";

export const TypeView = () => {

    //Estado para almacenar la lista de tipos
    const [types, setTypes] = useState([]);

    //Estado para manejar la carga de datos
    const [loading, setLoading] = useState(true);

    //Estado para manejar errores
    const [error, setError] = useState(null);

    //Manejo del Navigate
    const navigate = useNavigate();

    //Efecto para cargar los tipos cuando el componente se monta
    useEffect(() => {

        //funcion para cargar los tipos
        const fetchTypes = async () => {
            try {
                setLoading(true);

                //Llamamos al metodo getAll del servicio
                const data = await typeService.getAll();
                setTypes(data);
                setError(null);
            } catch (err) {
                console.error("Error al cargar los tipos: ", err);
                setError("No se pudieron cargar los tipos, Por favor intenta nuevamente")
            } finally {
                setLoading(false);
            }
        };
        
        //Ejecutamos la funcion
        fetchTypes();
    },[]); //El array vacio asegura que esto solo se ejecute una vez al montar el componente

    const editType = (id) => {
        navigate(`/tipos/${id}`);
    }

    //Funcion para eliminar
    const deleteType = async (id) => {
        if (window.confirm("¿Seguro que deseas eliminar este tipo?")) {
            try {
                await typeService.delete(id);

                //Actualizamos la lista eliminando el tipo borrado
                setTypes(types.filter(type => type._id !== id));
                
                alert('Tipo eliminado correctamente');
            } catch (err) {
                console.error("Error al eliminar el tipo", err);
                alert('Error al elimnar el tipo')
            }
        }
    };

    return (
        <div className="container mt-4"> {/* media-list-container*/}
            <h2 className="text-center">Lista de tipos</h2>
            
            <NavLink to={'/tipos/create'} className="btn btn-success mb-3">Crear Nuevo Tipo</NavLink>
        
            {/* Mostrar mensaje de carga */}
            {loading && <p>Cargando Tipos...</p>}

            {/* Mostrar mensaje de error si existe */}
            {error && <div className="error-message">{error}</div>}

            {/* Mostrar la lista de usuarios si hay un error y no esta cargando */}
            {!loading && !error && (
                <>
                {types.length > 0 ? (

                    <div className="container">
                        
                        <div className="row g-3">
                            
                            {types.map(type => (
                                <div className="col-md-3" key={type._id}>
                                    <div 
                                        className="card h-100 bg-light shadow-sm border-0"
                                        style={{cursor: 'pointer', transition: 'transform 0.3s', boxShadow: '0.3s', width:'100%'}}
                                        onClick={() => alert(`Detalle del tipo: ${type._id}`)}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'scale(1.05)';
                                            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'scale(1)';
                                            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                                        }}
                                    >
                                        <div className="card-body">
                                            <h5 className="card-tittle">{type.nombre}</h5>
                                            <p className="card-text">{type.descripcion}</p>
                                            <div className="card-body d-flex justify-content-around">
                                            <button className="btn btn-warning me-2" onClick={(e) => {e.stopPropagation();  editType(type._id)}}>Editar</button>
                                            <button className="btn btn-danger" onClick={(e) => {e.stopPropagation(); deleteType(type._id)}}>Eliminar</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>No hay tipos disponibles</p>
                )}
                </>
            )}

        </div> 
    );

};

export default TypeView;

