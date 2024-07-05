import React, { useState, useEffect, useContext } from 'react';
import './UsuariosRegistrados.css';
import Header from './Header';
import Footer from './Footer';
import Menu from "./menu";
import { UsuarioContext } from '../usuContext';
import { format } from 'date-fns';

const UsuariosRegistrados = () => {
    const { usuarios, setUsuarios } = useContext(UsuarioContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [usuariosPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");

    // Filtrar usuarios según el término de búsqueda
    const filteredUsuarios = usuarios.filter(usuario =>
        usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        usuario.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
        usuario.correo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Obtener los usuarios de la página actual
    const indexOfLastUsuario = currentPage * usuariosPerPage;
    const indexOfFirstUsuario = indexOfLastUsuario - usuariosPerPage;
    const currentUsuarios = filteredUsuarios.slice(indexOfFirstUsuario, indexOfLastUsuario);

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calcular el número total de páginas
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredUsuarios.length / usuariosPerPage); i++) {
        pageNumbers.push(i);
    }

    const upEstado = async (usuarioId) => {
        const response = await fetch(`http://localhost:3080/api/usuarios/${usuarioId}/upEstado`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (response.ok) {
            setUsuarios((prevUsuarios) =>
                prevUsuarios.map((usuario) =>
                    usuario.id === usuarioId ? { ...usuario, estado: data.estado } : usuario
                )
            );
        } else {
                console.error('Error al cambiar el estado del usuario:', data.error);
        }

    };

    return (
        <>
            <Header />
            <div className="main-container">
                <Menu />
                <div className="content">
                    <div className="usuarios-registrados-container">
                        <h3>Usuarios registrados</h3>
                        <div className="usuarios-search">
                            <input
                                type="text"
                                placeholder="Buscar por correo, nombre o apellidos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <table className="usuarios-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Correo</th>
                                    <th>Fecha de Registro</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsuarios.map(usuario => (
                                    <tr key={usuario.id}>
                                        <td>{usuario.id}</td>
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.apellido}</td>
                                        <td>{usuario.correo}</td>
                                        <td>{format(new Date(usuario.fecha_registro), 'dd/MM/yyyy')}</td>
                                        <td>{usuario.estado}</td>
                                        <td>
                                            <a href="#" onClick={() => upEstado(usuario.id)}>
                                                {usuario.estado === 'Activo' ? 'Desactivar' : 'Activar'}
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="usuarios-pagination">
                            <ul className="usuarios-pagination-list">
                                {currentPage > 1 && (
                                    <li className="usuarios-pagination-item" onClick={() => paginate(currentPage - 1)}>
                                        <a href="#">Anterior</a>
                                    </li>
                                )}
                                {pageNumbers.map(number => (
                                    <li key={number} className={`usuarios-pagination-item ${number === currentPage ? 'active' : ''}`} onClick={() => paginate(number)}>
                                        <a href="#">{number}</a>
                                    </li>
                                ))}
                                {currentPage < pageNumbers.length && (
                                    <li className="usuarios-pagination-item" onClick={() => paginate(currentPage + 1)}>
                                        <a href="#">Siguiente</a>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
};

export default UsuariosRegistrados;