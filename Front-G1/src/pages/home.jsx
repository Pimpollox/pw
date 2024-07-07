import React, { useState, useEffect, useContext } from 'react';
import ProductCard from './ProductCard';
import './Home.css';
import CollectionCard from '../componentes/CollectionCard';
import HeaderPrincipal from '../componentes/HeaderPrincipal';
import FooterPrincipal from '../componentes/FooterPrincipal';
import { ModelosContext } from '../modelosContext';
import { MarcaContext } from '../marcaContext';

function Home() {
  const { modelos } = useContext(ModelosContext);
  const { marcas } = useContext(MarcaContext);
  const [data, setData] = useState({
    featuredCollections: [],
    newCollections: [],
    featuredProducts: [],
    newProducts: []
  });
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (modelos.length && marcas.length) {
      const uniqueBrands = [...new Set(marcas.map(marca => marca.nombre))];
      
      const featuredCollections = marcas.slice(0, 3);
      let featuredProductList = [];
      featuredCollections.forEach((collection) => {
        const collectionModels = modelos.filter(model => model.MarcaId === collection.id && model.estado === "Activo").slice(0, 4);
        featuredProductList = [...featuredProductList, ...collectionModels];
      });
      featuredProductList = featuredProductList.map((p, index) => ({
        ...p,
        marca: uniqueBrands[Math.floor(index / 4)]
      }));

      const newCollections = marcas.slice(2, 5);
      let newProductList = [];
      newCollections.forEach((collection) => {
        const collectionModels = modelos.filter(model => model.MarcaId === collection.id && model.estado === "Activo").slice(0, 2);
        newProductList = [...newProductList, ...collectionModels];
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
    }
  }, [modelos, marcas]);

  const handleSearch = (searchTerm) => {
    const filtered = modelos.filter(modelo =>
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
