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

    if (!newPassword || !repeatPassword) {  // Corrección 1: Validación de campos vacíos
      setError('Todos los campos son obligatorios');
      return;
    }

    if (newPassword !== repeatPassword) {  // Corrección 2: Validación de contraseñas coincidentes
      setError('Las contraseñas no coinciden');
      return;
    }

    setIsModalOpen(true);
  };

  const handleModalSubmit = async () => {
    if (confirmPassword !== usuarioActual.contraseña) {  // Corrección 3: Validación de la contraseña de confirmación
      setError('La contraseña de confirmación es incorrecta');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3080/api/usuarios/update-password/${usuarioActual.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nuevaContraseña: newPassword }),  // Corrección 4: Nombre del campo de contraseña actualizado
      });

      if (!response.ok) {
        const data = await response.json();  // Corrección 5: Obtener mensaje de error del servidor
        throw new Error(data.error || 'Error al actualizar la contraseña');
      }

      const updatedUsuario = { ...usuarioActual, contraseña: newPassword };  // Corrección 6: Actualización del contexto del usuario con la nueva contraseña
      setUsuarioActual(updatedUsuario);  // Corrección 6: Actualización del contexto del usuario con la nueva contraseña
      console.log('Contraseña actualizada');
      setError('');
      setNewPassword('');
      setRepeatPassword('');
      setConfirmPassword('');
      setIsModalOpen(false);
    } catch (error) {
      setError(error.message);  // Corrección 7: Manejo de errores
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
              {error && <p className="error-message">{error}</p>}  // Corrección 8: Mostrar mensajes de error
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
