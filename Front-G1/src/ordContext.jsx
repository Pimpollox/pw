import React, { createContext, useState, useEffect, useContext } from 'react';
import { UsuarioContext } from './usuContext';

const OrdenContext = createContext();

const OrdenProvider = ({ children }) => {
  const [ordenes, setOrdenes] = useState([]);
  const { usuarioActual } = useContext(UsuarioContext);

  useEffect(() => {
    fetch('http://localhost:3080/api/ordenes')
      .then((response) => response.json())
      .then((data) => setOrdenes(data))
      .catch((error) => console.error('Error al cargar órdenes:', error));
  }, []);

  return (
    <OrdenContext.Provider value={{ ordenes }}>
      {children}
    </OrdenContext.Provider>
  );
};

export { OrdenContext, OrdenProvider };
