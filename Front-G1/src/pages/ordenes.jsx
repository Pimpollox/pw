import React from 'react'

import './ordenes.css'
import { Link } from "react-router-dom";
import HeaderPrincipal from '../componentes/HeaderPrincipal';
import FooterPrincipal from '../componentes/FooterPrincipal';


function ordenes() {

    return (
        <>
        <HeaderPrincipal />
        <div id="ordenes">
        <div id="Aviso1">
            <p>Muchas gracias por tu compra!</p>
        </div>
        <div className="Items1">
            <p><b>Datos de Compra</b></p>
        </div>
        <div id="DatosEnvio1">
        <p><b>Direccion de Envio</b></p>
        <p>Javier prado Este #2405 Surco Lima</p>
        </div>
        <div id="Pago1">
            <div id="FormaPago1">
            <p><b>Pago</b></p>
            <p>
                <input type="radio" id="Opcion1" name="opcion1" value="opcion1"></input>
                <label for="Opcion1">Pago con código QR</label><br/><br/>
                <input type="radio" id="Opcion1" name="opcion1" value="opcion1"></input>
                <label for="Opcion1">Pago con tarjeta de credito</label>
            </p>
            </div>
            <div id="NumTarjeta1">
                <p>Nro de tarjeta: **** **** **** 1423 VISA</p>
            </div>
        </div>
        <div className="Items1">
            <p><b>Método de Envío</b></p>
        </div>
        <div id="MetodoEnvio1">
                <input type="radio" id="Opcion2" name="opcion2" value="opcion2"></input>
                <label for="Opcion2">Economico Aereo - S/ 10.00</label>
                <input type="radio" id="Opcion2" name="opcion2" value="opcion2"></input>
                <label for="Opcion2">Envio prioritario (5 a 10 días) - S/ 17.00</label>
        </div>
        <div id="Pedido1">
            <p><b>Items en Pedido:</b></p>
            <div id="ProductoPedido">
                <p>1x Swatch - CHEQUERED WHITE SB02W400</p>
                <p>S/ 1500</p>    
            </div>
        </div>
        <div id="Resumen1">
            <p><b>Resumen de Orden:</b></p>
            <div id="ResumenPedido">
                <p>Subtotal:        S/.1500.00</p>
                <p>Envio:           S/.17.00</p>
                <p>Impuestos:       S/.18.00</p>
                <p>Total:           S/.1535.00</p>    
            </div>
            <div id="Orden1">
                <button type="button" id="OrdenButton"><Link to="/pedidocompletado">Cancelar Orden</Link></button>
            </div>
        </div>

        </div>
        <FooterPrincipal />
        </>
    )
    
}

export default ordenes
