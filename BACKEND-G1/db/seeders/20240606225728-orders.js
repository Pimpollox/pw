'use strict';
const fs = require('fs');
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const orders = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../json/ordenes.json'), 'utf-8'));

    await queryInterface.bulkInsert('Orders', orders.map(order => ({
      id: order.id,
      UserId: order.UserId,
      fecha_orden: new Date(order.fecha_orden),
      total: order.total,
      productos: order.productos,
      estado: order.estado,
      direccion: order.direccion,
      impuesto: order.impuesto,
      envio: order.envio,
      subtotal: order.subtotal,
      createdAt: new Date(),
      updatedAt: new Date()
    })), {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders', null, {});
  }
};
