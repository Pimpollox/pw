import React, { useState, useContext } from 'react';
import { UsuarioContext } from '../../usuContext';
import Header from '../Header';
import Menu from '../menu';
import Footer from '../Footer';
import 'react-datepicker/dist/react-datepicker.css';
import './updateDatos.css';

function UserDatos() {
  const { usuarioActual, setUsuarioActual } = useContext(UsuarioContext);
  const [nombre, setNombre] = useState(usuarioActual ? usuarioActual.nombre : '');
  const [apellido, setApellido] = useState(usuarioActual ? usuarioActual.apellido : '');
  const [correo, setCorreo] = useState(usuarioActual ? usuarioActual.correo : '');
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!nombre || !apellido || !correo) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3080/api/usuarios/${usuarioActual.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, apellido, correo })
      });

      if (!response.ok) {
        const data = await response.json();  
        throw new Error(data.error || 'Error al actualizar el usuario'); 
      }

      const data = await response.json();
      setUsuarioActual(data); 
      setMensaje('Datos actualizados correctamente');
      setError('');
    } catch (error) {
      setError(error.message); 
      setMensaje('');
    }
  };

  return (
    <>
      <Header />
      <div className="main-container">
        <Menu />
        <div className="content">
          <div className="update-container">
            <div className="update-box">
              <h2>Datos de Registro</h2>
              {error && <p className="error-message">{error}</p>} 
              {mensaje && <p className="success-message">{mensaje}</p>} 
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="update-input"
                  required
                />
                <input
                  type="text"
                  placeholder="Apellido"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  className="update-input"
                  required
                />
                <input
                  type="email"
                  placeholder="Correo"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  className="update-input"
                  required
                />
                <button type="submit" className="update-button">Actualizar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserDatos;
