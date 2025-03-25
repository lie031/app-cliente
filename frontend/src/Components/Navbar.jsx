import React, {useState} from "react"; //Importamos un Hook que nos permite manejar el estado de un 'Componente'
import {Link} from 'react-router-dom';
import "./Navbar.css"


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
    const [isOpen, setIsOpen] = useState(false);

    /**
     * Creamos la Funcion ToogleMenu
     * Se ejecuta la funcion cuando el usuario hace click en el menu
     * Al darle click el estado se convierte a lo contrario de lo que este definido
     */
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    //Renderizamos el Navbar
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link to="/" className="navbar-brand">Mi App</Link>
                <button 
                    className="navbar-toggle"
                    type="button"
                    onClick={toggleMenu}
                    aria-controls="navbarNav"
                    aria-expanded={isOpen}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="#" className="nav-link">Directoras</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="#" className="nav-link">Generos</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/medias" className="nav-link">Medias</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="#" className="nav-link">Productoras</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/tipos" className="nav-link">Tipos</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;