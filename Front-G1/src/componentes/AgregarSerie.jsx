import React, { useState, useContext, useRef } from 'react';
import './AgregarSerie.css';
import Header from './Header';
import Footer from './Footer';
import Menu from './menu';
import { MarcaContext } from '../marcaContext';

function AgregarSerie() {
    const { marcas, agregarMarca } = useContext(MarcaContext);
    const [nombre, setNombre] = useState('');
    const [imagen, setImagen] = useState('');
    const fileInputRef = useRef(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagen(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleInputChange = (event) => {
        const { value } = event.target;
        setNombre(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const nuevaMarca = {
            nombre: nombre,
            fecha_creacion: new Date().toISOString(),
          };

        try {
            const response = await fetch('http://localhost:3080/api/marcas/newMarca', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevaMarca),
            });
            if (response.ok) {
                alert("exito")
            } else {
                alert('Error al crear la marca');
            }
        } catch (error) {
            console.error('Error en la creación de la marca:', error);
            alert('Error en la creación de la marca');
        }
    };

    return (
        <>
            <Header />
            <div className="main-container">
                <Menu />
                <div className="content">
                    <div className="titulos">
                        <h3>Agregar Serie</h3>
                    </div>
                    <div className="container-form">
                        <div className="form-left">
                            <input
                                type="file"
                                id="cargarImagen"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                                ref={fileInputRef}
                            />
                            <div className="image-preview">
                                {imagen ? <img src={imagen} alt="Vista previa" /> : <span>No hay imagen seleccionada</span>}
                            </div>
                            <input
                                id="add-img"
                                type="button"
                                value="Agregar Imagen"
                                onClick={handleButtonClick}
                            />
                        </div>
                        <div className="form-right">
                            <form onSubmit={handleSubmit} className="form-right-top">
                                <p>
                                    <label>Nombre</label>
                                    <br />
                                    <input
                                        id="add-name"
                                        type="text"
                                        value={nombre}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </p>
                                <div>
                                    <input id="save" type="submit" value="Guardar" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default AgregarSerie;
