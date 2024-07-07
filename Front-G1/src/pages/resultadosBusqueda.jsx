import React, { useState } from 'react';
import productData from '../../public/data/relojes.json';
import ProductCard from './ProductCard';
import { useLocation } from 'react-router-dom';

import HeaderPrincipal from '../componentes/HeaderPrincipal';
import FooterPrincipal from '../componentes/FooterPrincipal';

function ResultadosBusqueda() {
  const location = useLocation();
  const searchTerm = new URLSearchParams(location.search).get('q');
  const [sortBy, setSortBy] = useState('relevancia'); // Opciones: 'relevancia', 'precioAsc', 'precioDesc', 'nombreAsc', 'nombreDesc'


productData.forEach((p)=>{
    p.modelos=p.modelos.map((m) =>({ ... m, marca : p.nombre}));
})

  const filteredProducts = productData.flatMap(marca => marca.modelos)
    .filter(product => 
      product.Serie.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.marca.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Ordenar productos según el criterio seleccionado
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'precioAsc') return a.precio - b.precio;
    if (sortBy === 'precioDesc') return b.precio - a.precio;
    if (sortBy === 'nombreAsc') return a.Serie.localeCompare(b.Serie);
    if (sortBy === 'nombreDesc') return b.Serie.localeCompare(a.Serie);
    return 0; // Mantener el orden original si es por relevancia
  });

  return (
    <>
    <HeaderPrincipal />
    <section className="products">
      <h2>Resultados de búsqueda para &apos;{searchTerm}&apos;</h2>

      {/* Opciones de ordenamiento */}
      <div className="sort-options">
        <label htmlFor="sort-by">Ordenar por:</label>
        <select id="sort-by" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="relevancia">Relevancia</option>
          <option value="precioAsc">Precio (menor a mayor)</option>
          <option value="precioDesc">Precio (mayor a menor)</option>
          <option value="nombreAsc">Nombre (A-Z)</option>
          <option value="nombreDesc">Nombre (Z-A)</option>
        </select>
      </div>

      {sortedProducts.length > 0 ? (
        <div className="products-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(250px, 1fr))', gap: '20px' }}>
          {sortedProducts.map((product) => (
            <ProductCard key={product.Serie} product={product} />
          ))}
        </div>
      ) : (
        <p>No se encontraron resultados para su búsqueda.</p>
      )}
    </section>
    <FooterPrincipal />
    </>
  );
}

export default ResultadosBusqueda;
