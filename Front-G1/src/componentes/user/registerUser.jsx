import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './registerUser.css';

function RegistroUsuario() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (contraseña !== confirmarContraseña) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch('http://localhost:3080/api/usuarios/newUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          apellido,
          correo,
          contraseña,
          estado: 'Activo',
          fecha_registro: new Date().toISOString(),
          tipo: 1,
        }),
      });

      if (response.ok) {
        setNombre('');
        setApellido('');
        setCorreo('');
        setContraseña('');
        setConfirmarContraseña('');
        setError('');
        navigate('/Login');
      } else {
        const data = await response.json();
        setError(data.error || 'Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      setError('Error al registrar usuario');
    }
  };

  return (
    <div className="registro-container">
      <div className="registro-box">
        <h2>Registro de Usuario</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="registro-input"
            required
          />
          <input
            type="text"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            className="registro-input"
            required
          />
          <input
            type="email"
            placeholder="Correo Electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="registro-input"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            className="registro-input"
            required
          />
          <input
            type="password"
            placeholder="Confirmar Contraseña"
            value={confirmarContraseña}
            onChange={(e) => setConfirmarContraseña(e.target.value)}
            className="registro-input"
            required
          />
          <button type="submit" className="registro-button">Registrarse</button>
        </form>
      </div>
    </div>
  );
}

export default RegistroUsuario;
