import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { UsuarioContext } from '../usuContext';

function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(UsuarioContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const tipoUsuario = await login(usernameOrEmail, password);

    if (tipoUsuario === 'suspendido') {
      setError('Tu cuenta está suspendida');
    } else if (tipoUsuario !== null) {
      console.log('Inicio de sesión exitoso');
      setError('');
      if (tipoUsuario === 1) {
        navigate(-1);
      } else if (tipoUsuario === 2) {
        navigate('/dashbr');
      }
    } else {
      console.log('Correo electrónico o contraseña incorrectos');
      setError('Correo electrónico o contraseña incorrectos');
    }

    setUsernameOrEmail('');
    setPassword('');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="usernameOrEmail"
            name="usernameOrEmail"
            placeholder="Nombre o Correo Electrónico"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            className="login-input"
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
          <div className="login-links">
            <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
            <Link to="/registro" className="register">Registrarse</Link>
          </div>
          <button type="submit" className="login-button">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
