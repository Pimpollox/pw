import React, { useState, useRef, useContext } from 'react';
import './AgregarProd.css';
import { MarcaContext } from '../marcaContext';
import Header from './Header';
import Footer from './Footer';
import Menu from './menu';

const AgregarProd = () => {
  const { marcas } = useContext(MarcaContext);

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [caracteristicas, setCaracteristicas] = useState('');
  const [marcaId, setMarcaId] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [imagen, setImagen] = useState('');
  const fileInputRef = useRef(null);

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nuevoProducto = {
      Serie: nombre,
      imagen: imagen,
      precio: parseFloat(precio),
      Descripcion: descripcion,
      Caracteristicas: caracteristicas,
      stock: parseInt(stock),
      estado: "Activo",
      MarcaId: parseInt(marcaId)
    };


    const response = await fetch('http://localhost:3080/api/modelos/addProd', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoProducto),
    });

    if (!response.ok) {
      throw new Error('Error al agregar producto');
    }

    setNombre('');
    setDescripcion('');
    setCaracteristicas('');
    setMarcaId('');
    setPrecio('');
    setStock('');
    setImagen('');
  };

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
      <div className='main-container'>
        <Menu />
        <div className='content'>
          <div className='container-form'>
            <div className='form-header'>
              <h3>Agregar Producto</h3>
            </div>
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
              <form className='form-right-top' onSubmit={handleSubmit}>
                <p>
                  <label>Nombre</label>
                  <br />
                  <input
                    id="add-name"
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </p>
                <p>
                  <label>Descripcion</label>
                  <br />
                  <textarea
                    id="add-des"
                    rows="5"
                    cols="40"
                    maxLength="150"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                  />
                </p>
                <p>
                  <label>Caracteristicas</label>
                  <br />
                  <textarea
                    id="add-features"
                    rows="7"
                    cols="40"
                    maxLength="150"
                    value={caracteristicas}
                    onChange={(e) => setCaracteristicas(e.target.value)}
                  />
                </p>
                <p>
                  <label>Precio</label>
                  <br />
                  S/. <input
                    id="add-price"
                    type="text"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                  />
                </p>
                <p>
                  <label>Stock</label>
                  <br />
                  <input
                    id="add-stock"
                    type="text"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
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

export default AgregarProd;
