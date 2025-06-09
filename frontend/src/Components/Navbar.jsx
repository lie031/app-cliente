import React, { useState, useEffect } from 'react' // Importamos un Hook que nos permite manejar el estado de un 'Componente'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import authService from '../Services/AuthService'

/**
 * Asi Podremos manejar el Menu Movil
 * Definimos el Componente Navbar utilizando una funcion flecha
 */
const Navbar = () => {
  /**
     * Aqui Utilizamos el Hook useState para manejar el estado de Visibilidad del menu
     * useState inicializa el estado con valor false, lo que significaria que el menu esta cerrado al principio
     * El estao isOpen almacena el valor si el estado esta abierto (true) o cerrado (false)
     * La funcion setIsOpen actualizara el estado
     */
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      const auth = authService.isAuthenticated()
      setIsAuthenticated(auth)
      if (auth) {
        try {
          const userData = await authService.getCurrentUser()
          setUser(userData)
        } catch (error) {
          console.error('Error al obtener usuario:', error)
          handleLogout()
        }
      }
    }
    checkAuth()
  }, [])

  const handleLogout = () => {
    authService.logout()
    setIsAuthenticated(false)
    setUser(null)
    navigate('/login')
  }

  /**
     * Creamos la Funcion ToogleMenu
     * Se ejecuta la funcion cuando el usuario hace click en el menu
     * Al darle click el estado se convierte a lo contrario de lo que este definido
     */
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }
  // Renderizamos el Navbar
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='container'>
        <Link to='/' className='navbar-brand'>Mi App</Link>
        <button
          className='navbar-toggle'
          type='button'
          onClick={toggleMenu}
          aria-controls='navbarNav'
          aria-expanded={isOpen}
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id='navbarNav'>
          <ul className='navbar-nav me-auto'>
            {isAuthenticated && (
              <>
                <li className='nav-item'>
                  <Link to='/' className='nav-link'>Inicio</Link>
                </li>
                <li className='nav-item'>
                  <Link to='/directores' className='nav-link'>Directores</Link>
                </li>
                <li className='nav-item'>
                  <Link to='/generos' className='nav-link'>Generos</Link>
                </li>
                <li className='nav-item'>
                  <Link to='/productoras' className='nav-link'>Productoras</Link>
                </li>
                <li className='nav-item'>
                  <Link to='/tipos' className='nav-link'>Tipos</Link>
                </li>
              </>
            )}
          </ul>
          <ul className='navbar-nav'>
            {isAuthenticated ? (
              <>
                <li className='nav-item'>
                  <span className='nav-link'>Bienvenido, {user?.nombre}</span>
                </li>
                <li className='nav-item'>
                  <button onClick={handleLogout} className='btn btn-link nav-link'>
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className='nav-item'>
                  <Link to='/login' className='nav-link'>Iniciar Sesión</Link>
                </li>
                <li className='nav-item'>
                  <Link to='/registro' className='nav-link'>Registrarse</Link>
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
