'use strict';
const fs = require('fs');
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const modelos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../json/modelos.json'), 'utf-8'));

    await queryInterface.bulkInsert('Modelos', modelos.map(modelo => ({
      Serie: modelo.Serie,
      imagen: modelo.imagen,
      precio: parseFloat(modelo.precio),
      Descripcion: modelo.Descripcion,
      Caracteristicas: modelo.Caracteristicas,
      stock: modelo.stock,
      estado: modelo.estado,
      MarcaId: modelo.MarcaId,
      createdAt: new Date(),
      updatedAt: new Date()
    })), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Modelos', null, {});
  }
};
