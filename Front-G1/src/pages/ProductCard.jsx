/* eslint-disable no-unused-vars */
import React, {useContext} from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes
import { Link } from 'react-router-dom';
import CartContext from '../CartContext';
function ProductCard({ product, brand }) {

    const { addToCart } = useContext(CartContext);
  return (
    <div className="product-card">
        <div className="img-container"><img src={product.imagen} alt={product.Serie} /></div>
      
      <h3>{product.Serie}</h3>
      <h4>{brand}</h4>
      <p className="price">S/. {product.precio}</p>
      <button className="btn" onClick={() => addToCart(product)}> 
        Agregar al Carrito
      </button>
      <div className='DetailLink'><Link to={`/producto/${product.Serie}`}>Ver más</Link></div> 
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    imagen: PropTypes.string.isRequired,
    Serie: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
  }).isRequired,
  brand: PropTypes.string.isRequired
};

export default ProductCard;
