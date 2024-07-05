import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import './ListProd.css';
import Header from './Header';
import Footer from './Footer';
import Menu from "./menu";
import { MarcaContext } from "../marcaContext";
import { ModelosContext } from "../modelosContext";

function ListProd() {
    const { marcas } = useContext(MarcaContext);
    const { modelos } = useContext(ModelosContext);
    
    const [relojes, setRelojes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [relojesPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (marcas.length && modelos.length) {
            const relojesConIdModelo = modelos.flatMap(modelo => {
                const marca = marcas.find(marca => marca.id === modelo.MarcaId);
                return {
                    id: modelo.id,
                    Serie: modelo.Serie,
                    marca: marca ? marca.nombre : 'null',
                    precio: modelo.precio,
                    stock: modelo.stock,
                    estado: modelo.estado
                };
            });
            setRelojes(relojesConIdModelo);
        }
    }, [marcas, modelos]);

    const handleDesactivar = async (id) => {
        const response = await fetch(`http://localhost:3080/api/modelos/${id}/upEstado`, {
            method: 'PUT'
        });

        if (response.ok) {
            const updatedEstado = await response.json();
            const updatedRelojes = relojes.map(reloj => {
                if (reloj.id === id) {
                    return { ...reloj, estado: updatedEstado.estado };
                }
                    return reloj;
            });
            setRelojes(updatedRelojes);
        } else {
            console.error('Error al actualizar el estado del modelo');
        }
    };

    const filteredRelojes = relojes.filter(reloj =>
        reloj.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reloj.Serie.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reloj.id.toString().includes(searchTerm.toLowerCase())
    );

    // Obtener índices de los relojes que se mostrarán en la página actual
    const indexOfLastReloj = currentPage * relojesPerPage;
    const indexOfFirstReloj = indexOfLastReloj - relojesPerPage;
    const currentFilteredRelojes = filteredRelojes.slice(indexOfFirstReloj, indexOfLastReloj);

    // Función para cambiar de página
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Calcular el número total de páginas basado en los relojes filtrados
    const totalPages = Math.ceil(filteredRelojes.length / relojesPerPage);

    // Calcular el número total de páginas
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <Header />
            <div className="main-container">
                <Menu />
                <div className="content">
                    <div className="container-listPr">
                        <div className="listPr-header">
                            <h3>Relojes</h3>
                            <Link to="/addPrd" className="add-product-link">+ Agregar Producto</Link>
                        </div>
                        <div className="search-cont">
                            <input
                                type="text"
                                placeholder="Buscar por marca, modelo o ID ..."
                                className="search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <table className="list-table">
                            <thead>
                                <tr className="list-table-header">
                                    <th>ID</th>
                                    <th>Marca</th>
                                    <th>Modelo</th>
                                    <th>Precio</th>
                                    <th>Stock</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentFilteredRelojes.map(reloj => (
                                    <tr key={reloj.id}>
                                        <td>{reloj.id}</td>
                                        <td>{reloj.marca}</td>
                                        <td>{reloj.Serie}</td>
                                        <td>{reloj.precio}</td>
                                        <td>{reloj.stock}</td>
                                        <td>{reloj.estado}</td>
                                        <td>
                                            <button className="list-desc" onClick={() => handleDesactivar(reloj.id)}>
                                                {reloj.estado === "Activo" ? "Desactivar" : "Activar"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="pagination">
                            <ul>
                                {currentPage > 1 && (
                                    <li onClick={() => paginate(currentPage - 1)}><a href="#">Anterior</a></li>
                                )}
                                {pageNumbers.map(number => (
                                    <li key={number} onClick={() => paginate(number)} className={number === currentPage ? 'active' : ''}>
                                        <a href="#">{number}</a>
                                    </li>
                                ))}
                                {currentPage < pageNumbers.length && (
                                    <li onClick={() => paginate(currentPage + 1)}><a href="#">Siguiente</a></li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ListProd;
