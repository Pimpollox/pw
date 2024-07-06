import React, { useState, useContext } from 'react';
import { UsuarioContext } from '../../usuContext';
import Header from '../Header';
import Menu from '../menu';
import Footer from '../Footer';
import './updateDatos.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function NewPassword() {
  const { usuarioActual, setUsuarioActual } = useContext(UsuarioContext);
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!newPassword || !repeatPassword) {  
      setError('Todos los campos son obligatorios');
      return;
    }

    if (newPassword !== repeatPassword) {  
      setError('Las contraseñas no coinciden');
      return;
    }

    setIsModalOpen(true);
  };

  const handleModalSubmit = async () => {
    if (confirmPassword !== usuarioActual.contraseña) {  
      setError('La contraseña de confirmación es incorrecta');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3080/api/usuarios/update-password/${usuarioActual.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nuevaContraseña: newPassword }), 
      });

      if (!response.ok) {
        const data = await response.json(); 
        throw new Error(data.error || 'Error al actualizar la contraseña');
      }

      const updatedUsuario = { ...usuarioActual, contraseña: newPassword };  
      setUsuarioActual(updatedUsuario);  
      console.log('Contraseña actualizada');
      setError('');
      setNewPassword('');
      setRepeatPassword('');
      setConfirmPassword('');
      setIsModalOpen(false);
    } catch (error) {
      setError(error.message);  
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
              <h2>Cambiar Password</h2>
              {error && <p className="error-message">{error}</p>} 
              <form onSubmit={handleSubmit}>
                <input
                  type="password"
                  placeholder="Nuevo"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="update-input"
                  required
                />
                <input
                  type="password"
                  placeholder="Repetir"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  className="update-input"
                  required
                />
                <button type="submit" className="update-button">Cambiar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Confirmar Contraseña"
        className="modal-content"
        overlayClassName="overlay"
      >
        <h2>Confirmar Contraseña</h2>
        <input
          type="password"
          placeholder="Contraseña actual"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="update-input"
          required
        />
        <button onClick={handleModalSubmit} className="update-button">Aceptar</button>
        <button onClick={() => setIsModalOpen(false)} className="update-button">Cancelar</button>
      </Modal>
    </>
  );
}

export default NewPassword;
