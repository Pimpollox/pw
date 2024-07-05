import React, { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { UsuarioContext } from '../usuContext';
import './menu.css';

function Menu() {
  const { usuarioActual } = useContext(UsuarioContext);

  return (
    <div>
      <div className="navegador">
        <nav className="nav-menu">
          <p style={{ color: 'black', paddingTop: '23px', paddingLeft: '29px', margin: '0px', fontSize: '20px', fontFamily: 'sans-serif' }}>Admin</p>
          <ul>
            {usuarioActual && usuarioActual.tipo === 1 ? (
              <>
                <li>
                  <Link to="/ordRecientes">Órdenes Recientes</Link>
                </li>
                <li>
                  <Link to="/datReg">Datos De Registro</Link>
                </li>
                <li>
                  <Link to="/upPassword">Cambiar Password</Link>
                </li>
              </>
            ) : usuarioActual && usuarioActual.tipo === 2 ? (
              <>
                <li>
                  <Link to="/dashbr">Dashboard</Link>
                </li>
                <li>
                  <Link to="/usureg">Usuarios registrados</Link>
                </li>
                <li>
                  <Link to="/listPrd">Productos</Link>
                </li>
                <li>
                  <Link to="/ordAdmin">Ordenes</Link>
                </li>
                {/* <li>
                  <Link to="/Productos_mas_vendidos">Productos más<br /> vendidos</Link>
                </li> */}
                <li>
                  <Link to="/Series">Series</Link>
                </li>
              </>
            ) : null}
          </ul>
        </nav>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Menu;
