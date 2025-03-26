import React, { useEffect, useState } from 'react'
import generoService from '../../Services/GeneroService'
import { useNavigate, useParams, NavLink } from 'react-router-dom'

const GeneroForm = () => {
  const { _id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    nombre: '',
    estado: 'Activo',
    descripcion: ''
  })

  useEffect(() => {
    if (_id) {
      const cargarGenero = async () => {
        try {
          const data = await generoService.getById(_id)
          if (data && typeof data === 'object') {
            setFormData({
              nombre: data.nombre || '',
              estado: data.estado || 'Activo',
              descripcion: data.descripcion || ''
            })
          }
        } catch (err) {
          console.error('Error al cargar el género: ', err)
        }
      }
      cargarGenero()
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
        await generoService.update(_id, formData)
        window.alert('Género actualizado con éxito')
      } else {
        await generoService.create(formData)
        window.alert('Género creado con éxito')
      }
      navigate('/generos')
    } catch (err) {
      console.error('Error al guardar el género: ', err)
      window.alert('Error al guardar el género')
    }
  }

  return (
    <div className='container my-4'>
      <div className='card shadow-lg'>
        <div className='card-header bg-primary text-white'>
          <h2 className='text-center mb-0'>{_id ? 'Editar Género' : 'Crear Género'}</h2>
        </div>
        <div className='card-body'>
          <form onSubmit={handleSubmit}>
            <div className='row'>
              <div className='col-md-4 mb-3'>
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
              <div className='col-md-4 mb-3'>
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
              <div className='col-md-4 mb-3'>
                <label className='form-label'>Descripción</label>
                <textarea
                  name='descripcion'
                  value={formData.descripcion}
                  onChange={handleChange}
                  className='form-control'
                  required
                />
              </div>
            </div>
            <div className='d-flex justify-content-around'>
              <NavLink to='/generos' className='btn btn-danger w-50'>Regresar</NavLink>
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

export default GeneroForm
