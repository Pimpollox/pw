import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Series.css';
import Header from './Header';
import Footer from './Footer';
import Menu from './menu';
import { MarcaContext } from '../marcaContext';
import { ModelosContext } from '../modelosContext';
import { format } from 'date-fns';

const Series = () => {
    const { marcas } = useContext(MarcaContext);
    const { modelos } = useContext(ModelosContext);
    const [relojes, setRelojes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [relojesPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (marcas.length && modelos.length) {
            // Agrupar modelos por marcas
            const relojesData = marcas.map(marca => {
                const modelosMarca = modelos.filter(modelo => modelo.MarcaId === marca.id);
                return {
                    id: marca.id,
                    nombre: marca.nombre,
                    nroProductos: modelosMarca.length,
                    fecha_creacion: marca.fecha_creacion
                };
            });
            setRelojes(relojesData);
        }
    }, [marcas, modelos]);

    // Filtrar relojes por término de búsqueda
    const filteredRelojes = relojes.filter(reloj =>
        reloj.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Obtener los relojes de la página actual
    const indexOfLastReloj = currentPage * relojesPerPage;
    const indexOfFirstReloj = indexOfLastReloj - relojesPerPage;
    const currentRelojes = filteredRelojes.slice(indexOfFirstReloj, indexOfLastReloj);

    // Calcular el número total de páginas
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredRelojes.length / relojesPerPage); i++) {
        pageNumbers.push(i);
    }

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <Header />
            <div className="main-container">
                <Menu />
                <div className="content">
                    <div className='series-container'>
                        <div className='series-header'>
                            <h3>Series</h3>
                            <Link to="/addseries" className="add-series-button">+ Agregar Serie</Link>
                        </div>
                        <br />
                        <div className='series-search'>
                            <input
                                id='series-search-input'
                                type='text'
                                placeholder="Buscar..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <br />
                        <div className='series-results'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Nro Productos</th>
                                        <th>Fecha de creación</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentRelojes.map((reloj, index) => (
                                        <tr key={index}>
                                            <td>{reloj.id}</td>
                                            <td>{reloj.nombre}</td>
                                            <td>{reloj.nroProductos}</td>
                                            <td>{format(new Date(reloj.fecha_creacion), 'dd/MM/yyyy')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="pagination">
                            <ul>
                                {pageNumbers.map(number => (
                                    <li key={number} onClick={() => paginate(number)} className={number === currentPage ? 'active' : ''}>
                                        <a href="#">{number}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Series;
