import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartContext from '../CartContext';
import { UsuarioContext } from '../usuContext';
import { OrdenContext } from '../ordContext';
import { ModelosContext } from '../modelosContext';
import HeaderPrincipal from '../componentes/HeaderPrincipal';
import FooterPrincipal from '../componentes/FooterPrincipal';
import './Checkout.css';

function CheckOut() {
  const { cartItems } = useContext(CartContext);
  const { usuarioActual } = useContext(UsuarioContext);
  const { crearOrden } = useContext(OrdenContext);
  const { modelos } = useContext(ModelosContext);
  const [isQrSelected, setIsQrSelected] = useState(false);
  const handlePagoChange = (event) => {
    setIsQrSelected(event.target.value === 'opcion1');
  };
  const [envio, setEnvio] = useState(0.00);
  const [direccionEnvio, setDireccionEnvio] = useState({
    linea1: '',
    linea2: '',
    distrito: '',
    ciudad: '',
    pais: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDireccionEnvio((prev) => ({ ...prev, [name]: value }));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.precio) * item.quantity, 0).toFixed(2);
  };

  const handleEnvioChange = (event) => {
    setEnvio(parseFloat(event.target.value));
  };

  const calculateTotal = () => {
    return (parseFloat(calculateSubtotal()) + envio + calculateImpuesto()).toFixed(2);
  };

  const calculateImpuesto = () => {
    return (calculateSubtotal()*0.18)
  }

  const handleCompleteOrder = async () => {
    try {
      if (!usuarioActual) {
        console.error('No hay usuario autenticado.');
        return;
      }

      const productos = [];
      cartItems.forEach(item => {
        for (let i = 0; i < item.quantity; i++) {
          const modelo = modelos.find(model => model.Serie === item.Serie);
          if (modelo) {
            productos.push(modelo.id);
          }
        }
      });

      const orderData = {
        productos,
        total: calculateTotal(),
        direccion: `${direccionEnvio.linea1}, ${direccionEnvio.linea2}, ${direccionEnvio.distrito}, ${direccionEnvio.ciudad}, ${direccionEnvio.pais}`,
        subtotal: calculateSubtotal(),
        impuesto: calculateImpuesto(),
        envio: envio.toFixed(2),
        fecha_orden: new Date().toISOString(),
        UserId: usuarioActual.id
      };

      const response = await fetch('http://localhost:3080/api/ordenes/newOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Error al completar la orden');
      }

      const newOrder = await response.json();
      console.log('Orden creada:', newOrder);

      navigate('/pedidocompletado');
    } catch (error) {
      console.error('Error al completar la orden:', error);
    }
  };

  
  return (
    <>
      <HeaderPrincipal />
      <div id="Checkout">
        <div id="Aviso">
          <p>¡Casi Listo! Tu orden no estará completa hasta que revises y presiones el botón "Completar orden" al final de la página.</p>
        </div>
        <div className="Items">
          <p><b>Datos de Compra</b></p>
        </div>
        <div id="DatosEnvio">
          <p><b>Dirección de Envío</b></p>
          <p><input type="text" name="linea1" className="inputTexto" placeholder="Línea 1" onChange={handleInputChange} /></p>
          <p><input type="text" name="linea2" className="inputTexto" placeholder="Línea 2" onChange={handleInputChange} /></p>
          <p><input type="text" name="distrito" className="inputTexto" placeholder="Distrito" onChange={handleInputChange} /></p>
          <p><input type="text" name="ciudad" className="inputTexto" placeholder="Ciudad" onChange={handleInputChange} /></p>
          <p><input type="text" name="pais" className="inputTexto" placeholder="País" onChange={handleInputChange} /></p>
        </div>
        <div id="Pago">
        <div id="FormaPago">
          <p><b>Pago</b></p>
          <p>
            <input type="radio" id="OpcionQR" name="formaPago" value="opcion1" onChange={handlePagoChange} />
            <label htmlFor="OpcionQR">Pago con código QR</label><br /><br />
            <input type="radio" id="OpcionTarjeta" name="formaPago" value="opcion2" onChange={handlePagoChange} />
            <label htmlFor="OpcionTarjeta">Pago con tarjeta de crédito</label>
          </p>
        </div>
        {isQrSelected && (
          <div id="QRCode">
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="Código QR de Pago" />
          </div>
        )}
      </div>
          <div id="NumTarjeta">
            <p><input type="text" className="inputTexto" placeholder="Número de Tarjeta" /></p>
            <p><input type="text" className="inputTexto" placeholder="Nombre en Tarjeta" /></p>
            <p>
              <input type="text" className="inputTexto" placeholder="Vencimiento" />
              <input type="text" className="inputTexto" placeholder="CCV" max="999" />
            </p>
          </div>
        </div>
        <div className="Items">
          <p><b>Método de Envío</b></p>
        </div>
        <div id="MetodoEnvio">
          <input type="radio" id="Opcion2" name="opcion2" value="10.00" onChange={handleEnvioChange} />
          <label htmlFor="Opcion2">Económico Aéreo - S/ 10.00</label>
          <input type="radio" id="Opcion2" name="opcion2" value="17.00" onChange={handleEnvioChange} />
          <label htmlFor="Opcion2">Envío prioritario (5 a 10 días) - S/ 17.00</label>
        </div>
        <div id="Pedido">
          <p><b>Ítems en Pedido:</b></p>
          <div id="ProductoPedido">
            {cartItems.map(item => (
              <div key={item.Serie}>
                <p>{item.quantity}x {item.Serie}</p>
                <p>S/ {(item.precio * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
        <div id="Resumen">
          <p><b>Resumen de Orden:</b></p>
          <div id="ResumenPedido">
            <p>Subtotal:        S/. {calculateSubtotal()}</p>
            <p>Envío:           S/. {envio.toFixed(2)}</p>
            <p>Impuestos:       S/. {calculateImpuesto()}</p>
            <p><b>Total:</b>    S/. {calculateTotal()}</p>
          </div>
        </div>
        <div id="CompletarPedido">
          <Link to="/"><button className="botonCancelar">Cancelar</button></Link>
          <button className="botonCompletar" onClick={handleCompleteOrder}>Completar Orden</button>
        </div>
      <FooterPrincipal />
    </>
  );
}

export default CheckOut;