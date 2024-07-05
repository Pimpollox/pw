import React, { createContext, useState, useEffect } from 'react';

const UsuarioContext = createContext();

const UsuarioProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioActual, setUsuarioActual] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3080/api/usuarios')
      .then((response) => response.json())
      .then((data) => setUsuarios(data))
      .catch((error) => console.error('Error al cargar usuarios:', error));
  }, []);

  const login = (usernameOrEmail, password) => {
    const usuario = usuarios.find(
      (u) => (u.correo === usernameOrEmail || u.nombre === usernameOrEmail) && u.contraseña === password
    );
    if (usuario) {
      if (usuario.estado === 'Activo') {
        setUsuarioActual(usuario);
        return usuario.tipo;
      } else {
        return 'suspendido';
      }
    }
    return null;
  };

  return (
    <UsuarioContext.Provider value={{ usuarios, setUsuarios, usuarioActual, setUsuarioActual, login }}>
      {children}
    </UsuarioContext.Provider>
  );
};

export { UsuarioContext, UsuarioProvider };
