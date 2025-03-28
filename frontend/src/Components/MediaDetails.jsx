import { useState, useEffect } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import mediaService from "../Services/MediaService";

const MediaDetail = () => {
    const { _id } = useParams();
    const [media, setMedia] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fecthMedia = async () => {
            try {
                setLoading(true);
                const data = await mediaService.getById(_id);
                setMedia(data);
            } catch (error) {
                console.error("Error al cargar la Media. ");
            } finally {
                setLoading(false);
            }
        };
        fecthMedia();

    },[_id]);

    if(loading) return <p>Cargando...</p>;
    if(!media) return <p>No se Encontro la Media.</p>;

    return(
        <div className="container mt-5">
            <div className="row d-flex justify-content-center">
                <div className=" row g-0">
                    <div className="col-md-4">
                        <img
                            src={media.img}
                            alt={media.titulo}
                            className="img-fluid rounded-start"
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h2 className="card-title">{media.titulo}</h2>
                            <p className="card-text">{media.sinopsis}</p>
                            <p className="card-text"><strong>Genero: </strong>{media.genero?.nombre}</p>
                            <p className="card-text"><strong>Director: </strong>{media.director?.nombre}</p>
                            <p className="card-text"><strong>Productora: </strong>{media.productora?.nombre}</p>
                            <p className="card-text">
                                <strong>Fecha de Estreno: </strong> {new Date(media.estreno).toLocaleDateString()}
                            </p>
                            
                            
                            <div className="d-flex justify-content-around">
                                <a href={media.url} className="btn btn-danger mt-3" target="_blank" rel="noopener noreferrer">Ver Ahora</a>
                                <NavLink to={'/medias'} className="btn btn-danger mt-3">Regresar</NavLink>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

};



export default MediaDetail;