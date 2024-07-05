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

  const crearOrden = async (productos, total, direccion, fechaOrden, subtotal, impuesto, envio) => {
    if (!usuarioActual) {
      throw new Error('Usuario no autenticado');
    }

    const orderData = {
      UserId: usuarioActual.id,
      productos : productos,
      total : total,
      direccion : direccion,
      subtotal: subtotal,
      impuesto : impuesto,
      envio,
      fecha_orden: fechaOrden,
    };

    console.log(orderData)
    try {
      const response = await fetch('http://localhost:3080/api/ordenes/newOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Error al completar la orden');
      }

      const newOrder = await response.json();
      setOrdenes(prevOrdenes => [...prevOrdenes, newOrder]);
      return newOrder;
    } catch (error) {
      console.error('Error al crear la orden:', error);
      throw error; // Propagar el error para que pueda ser manejado en el componente que llama a crearOrden
    }
  };

  // const crearOrden = async (productos, total, direccion, fechaOrden) => {
  //   if (!usuarioActual) {
  //     throw new Error('Usuario no autenticado');
  //   }

  //   const orderData = {
  //     UserId: usuarioActual.id,
  //     productos,
  //     total,
  //     direccion,
  //     fecha_orden: fechaOrden, // Incluir fecha_orden aquí
  //   };

  //   try {
  //     const response = await fetch('http://localhost:3080/api/ordenes/newOrder', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(orderData)
  //     });

  //     if (!response.ok) {
  //       throw new Error('Error al completar la orden');
  //     }

  //     const newOrder = await response.json();
  //     setOrdenes(prevOrdenes => [...prevOrdenes, newOrder]);
  //     return newOrder;
  //   } catch (error) {
  //     console.error('Error al crear la orden:', error);
  //     throw error; // Propagar el error para que pueda ser manejado en el componente que llama a crearOrden
  //   }
  // };

  return (
    <OrdenContext.Provider value={{ ordenes, crearOrden }}>
      {children}
    </OrdenContext.Provider>
  );
};

export { OrdenContext, OrdenProvider };
