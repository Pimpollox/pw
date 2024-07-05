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

ruta.post('/newMarca', async (req, res) => {
  try {
    const { nombre, fecha_creacion } = req.body;

    const lastMarca = await db.Marca.findOne({
      order: [['id', 'DESC']],
    });

    let nextId = 1;

    if (lastMarca) {
      nextId = lastMarca.id + 1;
    }

    const nuevaMarca = await db.Marca.create({
      id: nextId,
      nombre,
      fecha_creacion,
    });

    res.status(201).json(nuevaMarca);
  } catch (error) {
    console.error('Error al crear marca:', error);
    res.status(500).json({ error: 'Error al crear marca', details: error.message });
  }
});

module.exports = ruta;
