import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './Searchbar';
import PropTypes from 'prop-types';
import './HeaderPrincipal.css';
import { UsuarioContext } from '../usuContext';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function Header({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { usuarioActual, setUsuarioActual } = useContext(UsuarioContext);
  const navigate = useNavigate();

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
            <li>
              <Link to="/mas-vendidos">Más Vendidos</Link>
            </li>
            <li>
              <Link to="/nuevos">Nuevos</Link>
            </li>
            <li>
              <Link to="/ofertas">Ofertas</Link>
            </li>
            <li>
              <button onClick={handleVerCarrito} className="link-button">Ver Carrito</button>
            </li>
          </ul>
        </nav>
        <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        <button onClick={() => setModalIsOpen(true)}>Cuenta</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              width: '300px',
              height: '200px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }
          }}
        >
          <h2>Opciones de Cuenta</h2>
          {usuarioActual ? (
            <>
              <button onClick={handleViewProfile}>Ver Perfil</button>
              <button onClick={handleLogout}>Cerrar Sesión</button>
            </>
          ) : (
            <>
              <button onClick={handleLogin}>Iniciar Sesión</button>
            </>
          )}
        </Modal>
      </div>
    </header>
  );
}

Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Header;
