/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import ProductCard from './ProductCard';
import HeaderPrincipal from '../componentes/HeaderPrincipal';
import FooterPrincipal from '../componentes/FooterPrincipal';
import { ModelosContext } from '../modelosContext';
import { MarcaContext } from '../marcaContext';

function Nuevos() {
  const { modelos } = useContext(ModelosContext);
  const { marcas } = useContext(MarcaContext);

  // Obtener el primer modelo de cada marca
  const newProducts = marcas.flatMap((marca) => {
    const modelosDeMarca = modelos.filter((modelo) => modelo.MarcaId === marca.id);
    return modelosDeMarca.slice(0, 1);
  });

  const productosConMarcas = newProducts.map((producto) => {
    const marca = marcas.find((marca) => marca.id === producto.MarcaId);
    return { ...producto, marca: marca ? marca.nombre : 'Unknown' };
  });

  return (
    <>
      <HeaderPrincipal />
      <section className="products">
        <h2>Nuevos Productos</h2>
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

export default Nuevos;
