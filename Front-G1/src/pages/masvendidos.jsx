/* eslint-disable no-unused-vars */
import React from 'react';
import ProductCard from './ProductCard';
import productData from '../../public/data/relojes.json';

import HeaderPrincipal from '../componentes/HeaderPrincipal';
import FooterPrincipal from '../componentes/FooterPrincipal';

function MasVendidos() {
  // Lógica para obtener los productos más vendidos (puedes usar filtros, ordenamiento, etc.)
  const masVendidos = productData
    .flatMap(marca => marca.modelos) // Aplanar el array de modelos
    .sort((a, b) => b.precio - a.precio) // Ordenar por precio descendente (asumiendo que el precio es un número)
    .slice(0, 12); // Tomar los primeros 12 productos

  return (
    <>
    <HeaderPrincipal />
    <section className="products" style={{maxWidth: '100vw'}}>
      <h2>Productos más vendidos</h2>
      <div className="products-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(250px, 1fr))' }}>
        {masVendidos.map((product) => (
          <ProductCard key={product.Serie} product={product} />
        ))}
      </div>
    </section>
    <FooterPrincipal />
    </>
  );
}

export default MasVendidos;
