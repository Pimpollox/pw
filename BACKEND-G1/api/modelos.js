const express = require('express');
const ruta = express.Router();
const db = require('../db/models/index.js');

ruta.get('/', async (req, res) => {
  const modelos = await db.Modelo.findAll();
  res.json(modelos);
});

ruta.post('/addProd', async (req, res) => {
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
});

ruta.put('/:id/upEstado', async (req, res) => {
  const modeloId = req.params.id;
  const modelo = await db.Modelo.findByPk(modeloId);

  if (modelo) {
    modelo.estado = modelo.estado === 'Activo' ? 'Inactivo' : 'Activo';
    await modelo.save();
    res.json({ message: 'Estado del modelo actualizado correctamente', estado: modelo.estado });
  } else {
    res.status(404).json({ error: 'Modelo no encontrado' });
  }
});

ruta.put('/upMarca', async (req,res)=>{
  const modeloId = req.body.modeloId;
  const modelo = await db.Modelo.findByPk(modeloId);
  const marca = req.body.marcaId;

  modelo.MarcaId = marca;
  await modelo.save();
  res.json({message: 'Modelo fue agregado a Marca correctamente', Marca: modelo.MarcaId});
})

module.exports = ruta;