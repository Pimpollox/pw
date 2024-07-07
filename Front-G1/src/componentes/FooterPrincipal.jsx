/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-links">
          <ul>
            <li>
              <Link to="/nosotros">Nosotros</Link>
            </li>
            <li>
              <Link to="/contacto">Contacto</Link>
            </li>
            <li>
              <Link to="/preguntas-frecuentes">Preguntas Frecuentes</Link>
            </li>
          </ul>
        </div>
        <div className="footer-info">
          <p>&copy; {new Date().getFullYear()} La Tiendita del Abuelo. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
