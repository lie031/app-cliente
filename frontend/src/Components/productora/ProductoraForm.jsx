import React, { useEffect, useState } from 'react'
import ProductoraService from '../../Services/ProductoraService'
import { useNavigate, useParams } from 'react-router-dom'

const ProductoraForm = () => {
    const {_id} = useParams()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        nombre: "",
        estado: "",
        slogan: "",
        descripcion: ""
    })

    useEffect(() => {
        if (_id) {
            const cargarProductora = async () => {
                try {
                    const data = await ProductoraService.getById(_id)
                    if (data && typeof data === "object") {
                        setFormData({
                            nombre: data.nombre || "",
                            estado: data.estado || "",
                            slogan: data.slogan || "",
                            descripcion: data.descripcion || ""
                        })
                    }
                }
                catch (error) {
                    console.error("Error al cargar la productora:", error)
                }
            }
            cargarProductora()
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
                await ProductoraService.update(_id, formData)
                alert("Productora actualizada con éxito")
            }
            else {
                await ProductoraService.create(formData)
                alert("Productora creada con éxito")
            }
            navigate('/productoras')
        }
        catch (error) {
            console.error("Error al guardar la productora:", error)
            alert("Error al guardar la productora")
        }
    }

    return (
        <div className='container my-4'>
            <div className='card shadow-lg'>
                <div className='card-header bg-primary text-white'>
                    <h2 className='text-center mb-0'>{_id ? "Editar Productora" : "Crear Productora"}</h2>
                </div>
                <div className='card-body'>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label className='form-label'>Nombre</label>
                            <input type="text" name='nombre' className='form-control' value={formData.nombre} onChange={handleChange} required />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Estado</label>
                            <input type="text" name='estado' className='form-control' value={formData.estado} onChange={handleChange} required />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Slogan</label>
                            <input type="text" name='slogan' className='form-control' value={formData.slogan} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className='form-label'>Descripción</label>
                            <input type="text" name='descripcion' className='form-control' value={formData.descripcion} onChange={handleChange} required />
                        </div>
                        <button type='submit' className='btn btn-success'>Guardar</button>
                        <button type='button' className='btn btn-secondary ms-2' onClick={() => navigate('/productoras')}>Cancelar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProductoraForm