const express = require('express');
const ruta = express.Router();
const db = require('../db/models/index.js');

ruta.get('/', async (req, res) => {
  const Orderes = await db.Order.findAll({});
  res.json(Orderes);
});

ruta.post('/newOrder', async (req, res) => {
  try {
    const { productos, total, direccion, UserId, fecha_orden, subtotal, impuesto, envio } = req.body;

    const lastOrder = await db.Order.findOne({
      order: [['id', 'DESC']],
    });

    let nextOrderId = 1; 

    if (lastOrder) {
      nextOrderId = lastOrder.id + 1;
    }

    const newOrder = await db.Order.create({
      id: nextOrderId,
      productos,
      total,
      subtotal: subtotal,
      impuesto,
      envio: envio,
      direccion,
      fecha_orden,
      estado: 'En proceso',
      UserId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error al crear la Order:', error);
    res.status(500).json({ error: 'Error al crear la Order', details: error.message });
  }
});

ruta.get('/detalleOrder/:id', async (req, res) => {
  const orderId = req.params.id;
  const order = await db.Order.findByPk(orderId);
  console.log(order);
  res.json(order);
});

module.exports = ruta;