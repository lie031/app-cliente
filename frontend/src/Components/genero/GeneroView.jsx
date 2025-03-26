import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import generoService from '../../Services/GeneroService'

const GeneroView = () => {
  const [generos, setGeneros] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    cargarGeneros()
  }, [])

  const cargarGeneros = async () => {
    try {
      const data = await generoService.getAll()
      setGeneros(data)
      setLoading(false)
    } catch (err) {
      console.error('Error al obtener los géneros: ', err)
      setLoading(false)
    }
  }

  const handleDelete = async (_id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este género?')) {
      try {
        await generoService.delete(_id)
        setGeneros(generos.filter((genero) => genero._id !== _id))
        window.alert('Género eliminado con éxito')
      } catch (err) {
        console.error('Error al eliminar el género: ', err)
        window.alert('Error al eliminar el género')
      }
    }
  }

  return (
    <div className='container my-4'>
      <div className='card shadow-lg'>
        <div className='card-header bg-primary text-white d-flex justify-content-between align-items-center'>
          <h2 className='mb-0'>Lista de Géneros</h2>
          <NavLink to='/generos/create' className='btn btn-success'>
            Agregar Género
          </NavLink>
        </div>
        <div className='card-body'>
          {loading
            ? (
              <p className='text-center'>Cargando géneros...</p>
              )
            : generos.length === 0
              ? (
                <p className='text-center'>No hay géneros registrados.</p>
                )
              : (
                <div className='table-responsive'>
                  <table className='table table-bordered text-center'>
                    <thead className='table-dark'>
                      <tr>
                        <th>Nombre</th>
                        <th>Estado</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {generos.map((genero) => (
                        <tr key={genero._id}>
                          <td>{genero.nombre}</td>
                          <td>
                            <span className={`badge ${genero.estado === 'Activo' ? 'bg-success' : 'bg-danger'}`}>
                              {genero.estado}
                            </span>
                          </td>
                          <td>{genero.descripcion}</td>
                          <td>
                            <NavLink to={`/generos/${genero._id}`} className='btn btn-warning mx-1'>
                              Editar
                            </NavLink>
                            <button className='btn btn-danger mx-1' onClick={() => handleDelete(genero._id)}>
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                )}
        </div>
      </div>
    </div>
  )
}

export default GeneroView
