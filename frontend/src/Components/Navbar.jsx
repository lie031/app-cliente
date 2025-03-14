import React, {useState} from "react";
import {Link} from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Logo */}
                <div className="navbar-logo">MiApp</div>

                {/* Menu del Escritorio */}
                <div className="navbar-menu">
                    <Link to="/" className="navbar-item">Inicio</Link>
                    <Link to="#" className="navbar-item">Directoras</Link>
                    <Link to="#" className="navbar-item">Generos</Link>
                    <Link to="/medias" className="navbar-item">Medias</Link>
                    <Link to="#" className="navbar-item">Productoras</Link>
                    <Link to="#" className="navbar-item">Tipos</Link>
                </div>

                <button className="navbar-toggle"
                onClick={toggleMenu}
                >
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>

                </button>
            </div>

            <div className={`navbar-mobile ${isOpen ? 'active' : ''}`}>
                <Link to="/" className="navbar-mobile-item" onClick={() => setIsOpen(false)}>Inicio</Link>
                <Link to="#" className="navbar-mobile-item" onClick={() => setIsOpen(false)}>Director</Link>
                <Link to="#" className="navbar-mobile-item" onClick={() => setIsOpen(false)}>Generos</Link>
                <Link to="/medias" className="navbar-mobile-item" onClick={() => setIsOpen(false)}>Medias</Link>
                <Link to="#" className="navbar-mobile-item" onClick={() => setIsOpen(false)}>Productoras</Link>
                <Link to="#" className="navbar-mobile-item" onClick={() => setIsOpen(false)}>Tipos</Link>
            </div>
        </nav>
    )
}

export default Navbar;