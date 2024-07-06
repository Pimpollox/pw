import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const detallesOrd = () => {
  const { orderId } = useParams(); 
  const [orden, setOrden] = useState(null);

  useEffect(() => {
    const detalleOrder = async () => {
      try {
        // logica para obtener los detalles de la orden
        const response = await fetch(`http://localhost:3080/api/ordenes/detalleOrder/${orderId}`);
        const data = await response.json();
        setOrden(data);
      } catch (error) {
        console.error('Error al obtener los detalles de la orden:', error);
      }
    };

    detalleOrder();
  }, [orderId]);

  if (!orden) {
    return <div>Cargando detalles de la orden...</div>;
  }

  return (
    <div>
      <h2>Detalles de la Orden</h2>
      <p>ID de la Orden: {orden.id}</p>
      <p>Dirección de Envío: {orden.direccionEnvio}</p>
      <p>Subtotal: ${orden.Subtotal}</p>
      <p>Total: ${orden.total}</p>
      {/* otros detalles */}
    </div>
  );
};

export default detallesOrd;