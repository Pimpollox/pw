import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import SearchBar from './Searchbar';
import { UsuarioContext } from '../usuContext';
import './HeaderPrincipal.css';

Modal.setAppElement('#root');

function Header({ onSearch }) {
  const navigate = useNavigate();
  const { usuarioActual, setUsuarioActual } = useContext(UsuarioContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  const handleLogin = () => {
    setModalIsOpen(false);
    navigate('/login');
  };

  const handleLogout = () => {
    setUsuarioActual(null);
    setModalIsOpen(false);
  };

  const handleViewProfile = () => {
    setModalIsOpen(false);
    navigate('/ordRecientes');
  };

  const handleVerCarrito = () => {
    if (usuarioActual) {
      navigate('/carrito');
    } else {
      alert('Necesita iniciar sesión para ver el carrito');
      navigate('/login');
    }
  };

  return (
    <header>
      <div className="container">
        <div className="logo">
          <Link to="/">La Tiendita del Abuelo</Link>
        </div>
        <nav className='nav-header-principal'>
          <ul className='sectsPrincipal'>
            <li><Link to="/mas-vendidos">Más Vendidos</Link></li>
            <li><Link to="/nuevos">Nuevos</Link></li>
            <li><Link to="/ofertas">Ofertas</Link></li>
            <li><button onClick={handleVerCarrito} className="link-button">Ver Carrito</button></li>
          </ul>
        </nav>
        <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        <div style={{ position: 'relative', display: 'inline-block', float: 'right' }}> {/* Contenedor para el botón y el div de opciones */}
          <button onClick={() => setModalIsOpen(true)}>Cuenta</button>
          {modalIsOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: '0',
              width: '300px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'white',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              padding: '20px',
              zIndex: 100,
            }}>
              <h2>Opciones de Cuenta</h2>
              {usuarioActual ? (
                <>
                  <button onClick={handleViewProfile}>Ver Perfil</button>
                  <button onClick={handleLogout}>Cerrar Sesión</button>
                </>
              ) : (
                <button onClick={handleLogin}>Iniciar Sesión</button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Header;