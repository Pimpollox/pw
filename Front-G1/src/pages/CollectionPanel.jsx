/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';

function CollectionPanel({ collection, products }) {
  return (
    <section className="collection-panel">
      <h2>{collection.nombre}</h2>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} brand={collection.nombre} />
        ))}
      </div>
    </section>
  );
}

CollectionPanel.propTypes = {
  collection: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
  }).isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nombre: PropTypes.string.isRequired,
      modelos: PropTypes.arrayOf(
        PropTypes.shape({
          Serie: PropTypes.string.isRequired,
          imagen: PropTypes.string.isRequired,
          precio: PropTypes.string.isRequired,
          Descripcion: PropTypes.string.isRequired,
          Caracteristicas: PropTypes.string, // Algunas características pueden ser opcionales
        })
      ).isRequired,
    })
  ).isRequired,
};

export default CollectionPanel;
