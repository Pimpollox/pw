import React, { useState, useEffect, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Dashboard.css';
import Header from './Header';
import Footer from './Footer';
import Menu from './menu';
import { UsuarioContext } from '../usuContext';
import { OrdenContext } from '../ordContext';

const Dashboard = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const { usuarios } = useContext(UsuarioContext);
    const { ordenes } = useContext(OrdenContext);
    const [ordenesDelDia, setOrdenesDelDia] = useState(0);
    const [ingresosDelDia, setIngresosDelDia] = useState(0);
    const [usuariosNuevos, setUsuariosNuevos] = useState(0);

    useEffect(() => {
        const formattedDate = selectedDate.toISOString().split('T')[0];
        let ordenesCount = 0;
        let ingresosCount = 0;
        let usuariosCount = 0;

        ordenes.forEach(orden => {
            if (orden.fecha_orden.split('T')[0] === formattedDate) {
                ordenesCount++;
                ingresosCount += orden.total;
            }
        });

        usuarios.forEach(usuario => {
            if (usuario.fecha_registro.split('T')[0] === formattedDate) {
                usuariosCount++;
            }
        });

        setOrdenesDelDia(ordenesCount);
        setIngresosDelDia(ingresosCount);
        setUsuariosNuevos(usuariosCount);
    }, [selectedDate, ordenes, usuarios]);

    return (
        <>
            <Header />
            <div className="main-container">
                <Menu />
                <div className="content">
                    <div className="dashboard-header">
                        <h3>Dashboard</h3>
                        <div className="date-picker">
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                dateFormat="yyyy-MM-dd"
                            />
                        </div>
                    </div>
                    <div className="dashboard-metrics">
                        <div className="metric-box">
                            <h2>{ordenesDelDia}</h2>
                            <p>Órdenes del día de hoy</p>
                        </div>
                        <div className="metric-box">
                            <h2>{usuariosNuevos}</h2>
                            <p>Usuarios nuevos</p>
                        </div>
                        <div className="metric-box">
                            <h2>S/ {ingresosDelDia.toFixed(2)}</h2>
                            <p>Ingresos de hoy</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Dashboard;
