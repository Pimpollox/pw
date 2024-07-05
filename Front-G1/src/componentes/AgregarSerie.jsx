import React, { useState, useContext, useEffect, useRef } from 'react';
import './AgregarSerie.css';
import Header from './Header';
import Footer from './Footer';
import Menu from './menu';
import { MarcaContext } from '../marcaContext';

function AgregarSerie() {
    const { marcas } = useContext(MarcaContext);
    const [selectedMarca, setSelectedMarca] = useState(null); 
    const [productos, setProductos] = useState([]);
    const [imagen, setImagen] = useState('');
    const fileInputRef = useRef(null);

    // Función para manejar el cambio de marca seleccionada
    const handleMarcaChange = (e) => {
        const marcaId = parseInt(e.target.value);
        setSelectedMarca(marcas.find(marca => marca.id === marcaId));
    };

    // Función para cargar los productos de la serie
    const loadProductos = async () => {
        if (selectedMarca) {
            try {
                const response = await fetch(`http://localhost:3080/api/marcas/${selectedMarca.id}`);
                const data = await response.json();
                setProductos(data.modelos); // Suponiendo que los modelos están bajo la propiedad 'modelos' en la respuesta
            } catch (error) {
                console.error('Error al cargar productos:', error);
            }
        }
    };

    // Mostrar productos cuando se selecciona una marca
    useEffect(() => {
        loadProductos();
    }, [selectedMarca]);

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

    return (
        <>
            <Header />
            <div className="main-container">
                <Menu />
                <div className='content'>
                <div>
                    <div className='titulos'>
                        <h3>Agregar Serie</h3>
                    </div>
                    <div className='container-form'>
                    <div className='form-left'>
                        <input
                            type="file"
                            id="cargarImagen"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                            ref={fileInputRef}
                        />
                    <div className="image-preview">
                        {imagen ? (<img src={imagen} alt="" />) : (<span>No hay imagen seleccionada</span>)}
                    </div>
                        <input
                            id="add-img"
                            type="button"
                            value="Agregar Imagen"
                            onClick={handleButtonClick}
                        />
                    </div>
                    <div className='form-right'>
                    <form className='form-right-top'>
                        <p>
                            <label>Nombre</label>
                        <br />
                        <input
                            id="add-name"
                            type="text"

                        />
                        </p>
                        <p>
                            <label>Stock</label>
                            <br />
                            <input
                                id="add-stock"
                                type="text"

                            />
                        </p>
                        <div className="select-container">
                            <select onChange={handleMarcaChange}>
                                <option value="">Seleccione una marca</option>
                                {marcas.map(marca => (
                                    <option key={marca.id} value={marca.id}>{marca.nombre}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <input id="save" type="submit" value="Guardar" />
                        </div>
                    </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AgregarSerie;
