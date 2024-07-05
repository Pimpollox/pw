import React, { createContext, useState, useEffect } from 'react';

const MarcaContext = createContext();

const MarcaProvider = ({ children }) => {
  const [marcas, setMarcas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3080/api/marcas')
      .then((response) => response.json())
      .then((data) => setMarcas(data))
      .catch((error) => console.error('Error al cargar marcas:', error));
  }, []);

  return (
    <MarcaContext.Provider value={{ marcas }}>
      {children}
    </MarcaContext.Provider>
  );
};

export { MarcaProvider, MarcaContext };
