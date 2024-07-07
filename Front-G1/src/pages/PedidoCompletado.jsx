import React from 'react'
import ProductCard from './ProductCard';
import './PedidoCompletado.css'
import HeaderPrincipal from '../componentes/HeaderPrincipal';
import FooterPrincipal from '../componentes/FooterPrincipal';
import {Link } from 'react-router-dom';

function PedidoCompletado() {

    return (
        <>
        <HeaderPrincipal />
        <div id="PedidoC">
            <div id="Aviso1">
                <p>¡Muchas gracias por tu pedido!</p>
            </div>
            <div id="Aviso2">
                <p>Puedes ver los detalles de tu pedido ingresando a <u><a><Link to="/ordRecientes">tu cuenta</Link></a></u></p>
            </div>
            <div id="Aviso3">
                <p>Tambien te podria interesar...</p>
            </div>
            <div className="ProductosI">
                {productosInteres.map(producto => (
            <ProductCard key={producto.id} product={producto} brand={producto.marca} />
          ))}
            </div>
        </div>
        <FooterPrincipal />
        </>
    )
    
}

export default PedidoCompletado
