import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import './PedidoCompletado.css';
import HeaderPrincipal from '../componentes/HeaderPrincipal';
import FooterPrincipal from '../componentes/FooterPrincipal';
import { Link } from 'react-router-dom';

function PedidoCompletado() {
  const [productosInteres, setProductosInteres] = useState([]);

  useEffect(() => {
    fetch('http://localhost/api/modelos')
      .then(response => response.json())
      .then(data => {
        setProductosInteres(data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []); 
  return (
    <>
      <HeaderPrincipal />
      <div id="PedidoC">
        <div id="Aviso1">
          <p>¡Muchas gracias por tu pedido!</p>
        </div>
        <div id="Aviso2">
          <p>Puedes ver los detalles de tu pedido ingresando a <u><Link to="/ordRecientes">tu cuenta</Link></u></p>
        </div>
        <div id="Aviso3">
          <p>También te podría interesar...</p>
        </div>
        <div className="ProductosI">
          {productosInteres.map(producto => (
            <ProductCard key={producto.id} product={producto} brand={producto.marca} />
          ))}
        </div>
      </div>
      <FooterPrincipal />
    </>
  );
}

export default PedidoCompletado;
