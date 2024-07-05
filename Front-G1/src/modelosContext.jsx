import React, { createContext, useState, useEffect } from 'react';

const ModelosContext = createContext();

const ModelosProvider = ({ children }) => {
  const [modelos, setModelos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3080/api/modelos')
      .then((response) => response.json())
      .then((data) => setModelos(data))
      .catch((error) => console.error('Error al cargar modelos:', error));
  }, []);

  return (
    <ModelosContext.Provider value={{ modelos }}>
      {children}
    </ModelosContext.Provider>
  );
};

export { ModelosProvider, ModelosContext };