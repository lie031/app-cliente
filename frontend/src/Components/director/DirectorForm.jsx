import React, { useEffect, useState } from 'react'
import directorService from '../../Services/DirectorService'
import { useNavigate, useParams, NavLink } from 'react-router-dom'

const DirectorForm = () => {
  const { _id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    nombre: '',
    estado: 'Activo'
  })

  useEffect(() => {
    if (_id) {
      const cargarDirector = async () => {
        try {
          const data = await directorService.getById(_id)
          if (data && typeof data === 'object') {
            setFormData({
              nombre: data.nombre || '',
              estado: data.estado || 'Activo'
            })
          }
        } catch (err) {
          console.error('Error al cargar el director: ', err)
        }
      }
      cargarDirector()
    }
  }, [_id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (_id) {
        await directorService.update(_id, formData)
        window.alert('Director actualizado con éxito')
      } else {
        await directorService.create(formData)
        window.alert('Director creado con éxito')
      }
      navigate('/directores')
    } catch (err) {
      console.error('Error al guardar el director: ', err)
      window.alert('Error al guardar el director')
    }
  }

  return (
    <div className='container my-4'>
      <div className='card shadow-lg'>
        <div className='card-header bg-primary text-white'>
          <h2 className='text-center mb-0'>{_id ? 'Editar Director' : 'Crear Director'}</h2>
        </div>
        <div className='card-body'>
          <form onSubmit={handleSubmit}>
            <div className='row'>
              <div className='col-md-6 mb-3'>
                <label className='form-label'>Nombre</label>
                <input
                  type='text'
                  name='nombre'
                  value={formData.nombre}
                  onChange={handleChange}
                  className='form-control'
                  required
                />
              </div>
              <div className='col-md-6 mb-3'>
                <label className='form-label'>Estado</label>
                <select
                  name='estado'
                  value={formData.estado}
                  onChange={handleChange}
                  className='form-control'
                  required
                >
                  <option value='Activo'>Activo</option>
                  <option value='Inactivo'>Inactivo</option>
                </select>
              </div>
            </div>
            <div className='d-flex justify-content-around'>
              <NavLink to='/directores' className='btn btn-danger w-50'>Regresar</NavLink>
              <button type='submit' className='btn btn-success w-50'>
                {_id ? 'Actualizar' : 'Crear'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default DirectorForm
