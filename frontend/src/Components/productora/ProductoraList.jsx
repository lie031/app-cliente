import React, { useEffect, useState } from 'react'
import ProductoraService from '../../Services/ProductoraService'
import { NavLink, useNavigate } from 'react-router-dom'

const ProductoraList = () => {
    const [productoras, setProductoras] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProductoras = async () => {
            try {
                setLoading(true)
                const data = await ProductoraService.getAll()
                setProductoras(data)
                setError(null)
            }
            catch (error) {
                console.error("Errror al cargar las productoras:", error)
                setError("No se pudieron cargar las productoras, por favor intenta nuevamente...")
            }
            finally {
                setLoading(false)
            }
        }
        fetchProductoras()
    }, [])

    const editProductora = (id) => {
        navigate(`/productoras/${id}`)
    }

    const deleteProductora = async (id) => {
        if (window.confirm("¿Seguro que deseas eliminar esta prodcutora?")) {
            try {
                await ProductoraService.delete(id)
                setProductoras(productoras.filter(productora => productora._id !== id))
                alert('Productora eliminada con éxito')
            }
            catch (error) {
                console.error("Error al eliminar la productora", error)
                alert("Error al eliminar la productora")
            }
        }
    }

    return (
        <div className='container mt-4'>
            <h2 className='text-center'>Lista de Productoras</h2>
            {loading && <p>Cargando Productoras...</p>}
            {error && <div className='error-message'>{error}</div>}
            {!loading && !error && (
                <div className='container'>
                    <NavLink to={'/productoras/create'} className='btn btn-success mb-3'>Crear Productora</NavLink>
                    <div className='row g-3'>
                        {productoras.map(productora => (
                            <div className='col-md-3' key={productora._id}>
                                <div 
                                className='card h-100 bg-light shadow-sm border-0' 
                                style={{cursor: 'pointer', transition: 'transform 0.3s', boxShadow: '0.3s', width: '100%'}}
                                onClick={() => alert(`Detalle de Productora: ${productora._id}`)}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                                }}>
                                    <div className='card-body'>
                                        <h5 className='card-title'>{productora.nombre}</h5>
                                        <p className='card-text'><strong>Estado:</strong>  {productora.estado}</p>
                                        <p className='card-text'><strong>Slogan:</strong> {productora.slogan}</p>
                                        <p className='card-text'><strong>Descripción:</strong> {productora.descripcion}</p>
                                    </div>
                                    <div className='card-body d-flex justify-content-around'>
                                        <button className='btn btn-warning me-2' onClick={(e) => {e.stopPropagation(); editProductora(productora._id)}}>Editar</button>
                                        <button className='btn btn-danger' onClick={(e) => {e.stopPropagation(); deleteProductora(productora._id)}}>Eliminar</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductoraList