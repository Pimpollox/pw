import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Menu from './menu';
import { format } from 'date-fns';

const UserOrd = () => {
    const { usuario } = useParams();
    const [userDetails, setUserDetails] = useState(null);
    const [userOrders, setUserOrders] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3080/api/usuarios/${usuario}`)
            .then(response => response.json())
            .then(data => {
                setUserDetails(data);
                setUserOrders(data.ordenes);
            })
            .catch(error => console.error('Error fetching user data:', error));
    }, [usuario]);

    if (!userDetails) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
            <div className="main-container">
                <Menu />
                <div className="content">
                    <div className="usuario-detalle-container">
                        <h3>Detalle de Usuario Registrado</h3>
                        <div className="usuario-info">
                            <p>ID: {userDetails.id}</p>
                            <p>Nombre: {userDetails.nombre} {userDetails.apellido}</p>
                            <p>Correo: {userDetails.correo}</p>
                            <p>Fecha de Registro: {format(new Date(userDetails.fecha_registro), 'dd/MM/yyyy')}</p>
                        </div>
                        <h4>Órdenes recientes:</h4>
                        <table className="table-ordenes">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Fecha de Orden</th>
                                    <th>Total</th>
                                    <th>Productos</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userOrders.map(order => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{format(new Date(order.fecha_orden), 'dd/MM/yyyy')}</td>
                                        <td>{`S/${order.total.toFixed(2)}`}</td>
                                        <td>{order.productos.length}</td>
                                        <td>{order.estado}</td>
                                        <td><a href="#">Ver</a></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default UserOrd;