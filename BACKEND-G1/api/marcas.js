const express = require('express');
const ruta = express.Router();
const db = require('../db/models/index.js');

ruta.get('/', async (req, res) => {
  const marcas = await db.Marca.findAll({});
  res.json(marcas);
});

ruta.get('/:id', async (req, res) => {
  const marcaId = req.params.id;
  const marca = await db.Marca.findByPk(marcaId, {
    include: 'modelos'
  });

  if (marca) {
    res.json(marca);
  } else {
    res.status(404).json({ error: 'Marca no encontrada' });
  }
});

module.exports = ruta;
