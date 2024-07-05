/* eslint-disable no-unused-vars */
import productData from '../../public/data/relojes.json';
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import './Home.css';
import CollectionCard from '../componentes/CollectionCard';

import HeaderPrincipal from '../componentes/HeaderPrincipal';
import FooterPrincipal from '../componentes/FooterPrincipal';

function Home() {
  const [data, setData] = useState({
    featuredCollections: [],
    newCollections: [],
    featuredProducts: [],
    newProducts: []
  });
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const uniqueBrands = [...new Set(productData.map(marca => marca.nombre))];

    const featuredCollections = productData.slice(0, 3);
    let featuredProductList = featuredCollections.flatMap(modelo => {
      let list = [];
      for (let i = 0; i < 4; i++) {
        list.push(modelo.modelos[i]);
      }
      return list;
    });
    featuredProductList = featuredProductList.map((p, index) => ({
      ...p,
      marca: uniqueBrands[Math.floor(index / 4)]
    }));

    const newCollections = productData.slice(2, 5);
    let newProductList = newCollections.flatMap(modelo => {
      let list = [];
      for (let i = 0; i < 2; i++) {
        list.push(modelo.modelos[i]);
      }
      return list;
    });
    newProductList = newProductList.map((p, index) => ({
      ...p,
      marca: uniqueBrands[2 + Math.floor(index / 2)]
    }));

    setData({
      featuredCollections,
      newCollections,
      featuredProducts: featuredProductList,
      newProducts: newProductList
    });
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = productData.flatMap(marca => marca.modelos).filter(modelo =>
      modelo.Serie.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <>
      <HeaderPrincipal onSearch={handleSearch}/>
      <div>
        <main>
          {/* Mostrar Colecciones destacadas */}
          <section className='collections'>
            <h2>Colecciones destacadas</h2>
            <div className='collections-container'>
              {data.featuredCollections.map((collection) => (
                <CollectionCard key={collection.id} collection={collection} />
              ))}
            </div>
          </section>
          {/* Mostrar productos destacados */}
          <section className="products">
            <h2>Productos más vendidos</h2>
            <div className='products-container'>
              {data.featuredProducts.map((p, index) => (
                <ProductCard key={index} product={p} brand={p.marca} />
              ))}
            </div>
          </section>
          {/* Mostrar Colecciones nuevas */}
          <section className='collections'>
            <h2>Colecciones nuevas</h2>
            <div className='collections-container'>
              {data.newCollections.map((collection) => (
                <CollectionCard key={collection.id} collection={collection} />
              ))}
            </div>
          </section>
          {/* Mostrar productos nuevos */}
          <section className="products">
            <h2>Nuevos Productos</h2>
            <div className="products-container">
              {data.newProducts.map((p, index) => (
                <ProductCard key={index} product={p} brand={p.marca} />
              ))}
            </div>
          </section>
        </main>
      </div>
      <FooterPrincipal />
    </>
  );
}

export default Home;
