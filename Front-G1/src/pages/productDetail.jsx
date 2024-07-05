import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CartContext from '../CartContext';
import { MarcaContext } from '../marcaContext';
import { ModelosContext } from '../modelosContext';
import HeaderPrincipal from '../componentes/HeaderPrincipal';
import FooterPrincipal from '../componentes/FooterPrincipal';

function ProductDetail() {
  const { addToCart } = useContext(CartContext);
  const { serieId } = useParams();
  const { modelos } = useContext(ModelosContext);
  const { marcas } = useContext(MarcaContext);
  
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const foundProduct = modelos.find(modelo => modelo.Serie === serieId);
    if (foundProduct) {
      const marca = marcas.find(marca => marca.id === foundProduct.MarcaId);
      setProduct({ ...foundProduct, marca: marca ? marca.nombre : 'Unknown' });
    }
  }, [modelos, marcas, serieId]);

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <>
      <HeaderPrincipal />
      <section className="product-detail">
        <div className="product-detail-container">
          <div className="product-image">
            <img src={product.imagen} alt={product.Serie} />
          </div>
          <div className="product-info">
            <h2>{product.Serie}</h2>
            <p className="brand">Marca: {product.marca}</p>
            <p className="price">S/. {product.precio}</p>
            <p className="description">{product.Descripcion}</p>
            <p className="features">{product.Caracteristicas}</p>
            <button className="add-to-cart" onClick={() => addToCart(product)}>Agregar al Carrito</button>
          </div>
        </div>
      </section>
      <FooterPrincipal />
    </>
  );
}

export default ProductDetail;
