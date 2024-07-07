/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import ProductCard from './ProductCard';
import HeaderPrincipal from '../componentes/HeaderPrincipal';
import FooterPrincipal from '../componentes/FooterPrincipal';
import { ModelosContext } from '../modelosContext';
import { MarcaContext } from '../marcaContext';

function MasVendidos() {
  const { modelos } = useContext(ModelosContext);
  const { marcas } = useContext(MarcaContext);

  // Lógica para obtener los productos más vendidos (puedes usar filtros, ordenamiento, etc.)
  const masVendidos = modelos
    .filter((modelo) => modelo.estado === "Activo")
    .sort((a, b) => b.precio - a.precio) // Ordenar por precio descendente (asumiendo que el precio es un número)
    .slice(0, 12); // Tomar los primeros 12 productos

  const productosConMarcas = masVendidos.map((producto) => {
    const marca = marcas.find((marca) => marca.id === producto.MarcaId);
    return { ...producto, marca: marca ? marca.nombre : 'Unknown' };
  });

  const handleSearch = (searchTerm) => {
    const filtered = modelos.filter(modelo =>
      modelo.Serie.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <>
      <HeaderPrincipal onSearch={handleSearch}/>
      <section className="products" style={{ maxWidth: '100vw' }}>
        <h2>Productos más vendidos</h2>
        <div className="products-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(250px, 1fr))' }}>
          {productosConMarcas.map((product) => (
            <ProductCard key={product.Serie} product={product} />
          ))}
        </div>
      </section>
      <FooterPrincipal />
    </>
  );
}

export default MasVendidos;
