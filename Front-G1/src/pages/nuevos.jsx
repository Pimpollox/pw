/* eslint-disable no-unused-vars */
import React from 'react';
import ProductCard from './ProductCard';
import productData from '../../public/data/relojes.json';

import HeaderPrincipal from '../componentes/HeaderPrincipal';
import FooterPrincipal from '../componentes/FooterPrincipal';

function Nuevos() {
  const newProducts = productData.flatMap(marca => marca.modelos.slice(0, 1)); // Obtener el primer modelo de cada marca

  return (
    <>
    <HeaderPrincipal />
    <section className="products">
      <h2>Nuevos Productos</h2>
      <div className="products-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(250px, 1fr))' }}>
        {newProducts.map((product) => (
          <ProductCard key={product.Serie} product={product} />
        ))}
      </div>
    </section>
    <FooterPrincipal />
    </>
  );
}

export default Nuevos;
