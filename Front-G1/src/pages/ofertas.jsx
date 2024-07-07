/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import ProductCard from './ProductCard';
import HeaderPrincipal from '../componentes/HeaderPrincipal';
import FooterPrincipal from '../componentes/FooterPrincipal';
import { ModelosContext } from '../modelosContext';
import { MarcaContext } from '../marcaContext';

function Ofertas() {
  const { modelos } = useContext(ModelosContext);
  const { marcas } = useContext(MarcaContext);

  // Filtrar productos con precio menor a 500
  const productosEnOferta = modelos.filter((product) => product.precio < 500 && product.estado === "Activo");

  // Añadir la marca a cada producto
  const productosConMarcas = productosEnOferta.map((producto) => {
    const marca = marcas.find((marca) => marca.id === producto.MarcaId);
    return { ...producto, marca: marca ? marca.nombre : 'Unknown' };
  });

  return (
    <>
      <HeaderPrincipal />
      <section className="products">
        <h2>Ofertas</h2>
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

export default Ofertas;
