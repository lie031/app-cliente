import React, { useState, useEffect } from 'react'
import directorService from '../../Services/DirectorService'
import { useNavigate, NavLink } from 'react-router-dom'

export const DirectorView = () => {
  const [directores, setDirectores] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDirectores = async () => {
      try {
        setLoading(true)
        const data = await directorService.getAll()
        setDirectores(data)
        setError(null)
      } catch (err) {
        console.error('Error al cargar los directores: ', err)
        setError('No se pudieron cargar los directores, intenta nuevamente')
      } finally {
        setLoading(false)
      }
    }
    fetchDirectores()
  }, [])

  const editDirector = (id) => {
    navigate(`/directores/${id}`)
  }

  const deleteDirector = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este director?')) {
      try {
        await directorService.delete(id)
        setDirectores(directores.filter((director) => director._id !== id))
        window.alert('Director eliminado correctamente')
      } catch (err) {
        console.error('Error al eliminar el director', err)
        window.alert('Error al eliminar el director')
      }
    }
  }

  return (
    <div className='container mt-4'>
      <h2 className='text-center'>Lista de Directores</h2>

      {loading && <p>Cargando directores...</p>}
      {error && <div className='error-message'>{error}</div>}

      {!loading && !error && (
        <>
          {directores.length > 0
            ? (
              <div className='container'>
                <NavLink to='/directores/create' className='btn btn-success mb-3'>
                  Crear Nuevo Director
                </NavLink>
                <div className='row g-3'>
                  {directores.map((director) => (
                    <div className='col-md-3' key={director._id}>
                      <div
                        className='card h-100 bg-light shadow-sm border-0'
                        style={{ cursor: 'pointer', transition: 'transform 0.3s', boxShadow: '0.3s', width: '100%' }}
                        onClick={() => window.alert(`Detalle del director: ${director._id}`)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.05)'
                          e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)'
                          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)'
                        }}
                      >
                        <div className='card-body'>
                          <h5 className='card-title'>{director.nombre}</h5>
                          <p className='card-text'>Estado: {director.estado}</p>
                          <div className='card-body d-flex justify-content-around'>
                            <button className='btn btn-warning me-2' onClick={(e) => { e.stopPropagation(); editDirector(director._id) }}>
                              Editar
                            </button>
                            <button className='btn btn-danger' onClick={(e) => { e.stopPropagation(); deleteDirector(director._id) }}>
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              )
            : (
              <p>No hay directores disponibles</p>
              )}
        </>
      )}
    </div>
  )
}

export default DirectorView
