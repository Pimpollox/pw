const express = require('express');
const ruta = express.Router();
const db = require('../db/models/index.js');

ruta.get('/', async (req, res) => {
  const modelos = await db.Modelo.findAll();
  res.json(modelos);
});

ruta.post('/addProd', async (req, res) => {
  try {
    const { Serie, imagen, precio, Descripcion, Caracteristicas, stock, estado, MarcaId } = req.body;

    const nuevoProducto = await db.Modelo.create({
      Serie,
      imagen,
      precio,
      Descripcion,
      Caracteristicas,
      stock,
      estado,
      MarcaId
    });

    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error('Error al agregar producto:', error);
    res.status(500).json({ error: 'Error al agregar producto', details: error.message });
  }
});

module.exports = ruta;