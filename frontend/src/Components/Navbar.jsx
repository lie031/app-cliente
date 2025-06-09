import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import { useAuth } from '../context/AuthContext'

/**
 * Asi Podremos manejar el Menu Movil
 * Definimos el Componente Navbar utilizando una funcion flecha
 */
const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // Renderizamos el Navbar
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='container'>
        <Link to='/' className='navbar-brand'>App Cliente</Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav me-auto'>
            {isAuthenticated && (
              <>
                <li className='nav-item'>
                  <Link to='/media' className='nav-link'>Medias</Link>
                </li>
                {user.role === 'admin' && (
                  <>
                    <li className='nav-item'>
                      <Link to='/generos' className='nav-link'>Géneros</Link>
                    </li>
                    <li className='nav-item'>
                      <Link to='/directores' className='nav-link'>Directores</Link>
                    </li>
                    <li className='nav-item'>
                      <Link to='/productoras' className='nav-link'>Productoras</Link>
                    </li>
                    <li className='nav-item'>
                      <Link to='/tipos' className='nav-link'>Tipos</Link>
                    </li>
                  </>
                )}
              </>
            )}
          </ul>
          <ul className='navbar-nav'>
            {!isAuthenticated ? (
              <>
                <li className='nav-item'>
                  <Link to='/login' className='nav-link'>Iniciar Sesión</Link>
                </li>
                <li className='nav-item'>
                  <Link to='/registro' className='nav-link'>Registrarse</Link>
                </li>
              </>
            ) : (
              <>
                <li className='nav-item'>
                  <span className='nav-link'>Bienvenido, {user.nombre}</span>
                </li>
                <li className='nav-item'>
                  <button
                    className='btn btn-link nav-link'
                    onClick={handleLogout}
                  >
                    Cerrar Sesión
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
