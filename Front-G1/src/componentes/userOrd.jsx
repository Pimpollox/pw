import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Menu from './menu';
import { format } from 'date-fns';
import { OrdenContext } from '../ordContext';
import { ModelosContext } from '../modelosContext';

const UserOrd = () => {
    const { usuario } = useParams();
    const [userDetails, setUserDetails] = useState(null);
    const [userOrders, setUserOrders] = useState([]);
    const { ordenes } = useContext(OrdenContext);
    const { modelos } = useContext(ModelosContext);

    useEffect(() => {
        fetch(`http://localhost:3080/api/usuarios/${usuario}`)
            .then(response => response.json())
            .then(data => {
                setUserDetails(data);
                setUserOrders(data.ordenes);
            })
            .catch(error => console.error('Error fetching user data:', error));
    }, [usuario]);

    const obtenerDetalleModelo = (id) => {
        return modelos.find(modelo => modelo.id === id) || {};
    };

    const procesarProductos = (productos) => {
        const productoContado = productos.reduce((acc, id) => {
            if (!acc[id]) {
                acc[id] = 0;
            }
            acc[id]++;
            return acc;
        }, {});

        return Object.entries(productoContado).map(([id, cantidad]) => {
            const modelo = obtenerDetalleModelo(parseInt(id));
            return {
                id,
                cantidad,
                serie: modelo.Serie,
                precioTotal: modelo.precio * cantidad
            };
        });
    };

    if (!userDetails) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
            <div id="Checkout">
                <div className="Items">
                    <p><b>Datos de Compra</b></p>
                </div>
                <div id="DatosEnvio">
                    <p><b>Dirección de Envío</b></p>
                    {userOrders.map(order => (
                        <div key={order.id}>
                            <p><b>{order.direccion}</b></p>
                        </div>
                    ))}
                </div>
                <div id="Pago">
                    <div id="FormaPago">
                        <p><b>Pago</b></p>
                        <p>
                            <input type="radio" id="Opcion1" name="opcion1" value="opcion1" />
                            <label htmlFor="Opcion1">Pago con código QR</label><br /><br />
                            <input type="radio" id="Opcion1" name="opcion1" value="opcion1" />
                            <label htmlFor="Opcion1">Pago con tarjeta de crédito</label>
                        </p>
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
                <div id="Pedido">
                    <p><b>Ítems en Pedido:</b></p>
                    {userOrders.map(order => (
                        <div key={order.id}>
                            {procesarProductos(order.productos).map(producto => (
                                <div key={producto.id}>
                                    <p>{producto.cantidad}x {producto.serie}</p>
                                    <p>S/ {producto.precioTotal.toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div id="Resumen">
                    <p><b>Resumen de Orden:</b></p>
                    <div id="ResumenPedido">
                        {userOrders.map(order => (
                            <div key={order.id}>
                                <p>Subtotal:  S/.{order.subtotal}</p>
                                <p>Envío: S/.{order.envio}</p>
                                <p>Impuestos: S/.{order.impuesto}</p>
                                <p><b>Total: S/.{order.total}</b></p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default UserOrd;
