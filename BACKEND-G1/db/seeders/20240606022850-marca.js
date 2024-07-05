'use strict';
const fs = require('fs');
const path = require('path');

module.exports = {
  async up(queryInterface, Sequelize) {
    const marcasPath = path.resolve(__dirname, '../../json/marcas.json');
    const marcasData = JSON.parse(fs.readFileSync(marcasPath, 'utf-8'));

    await queryInterface.bulkInsert('Marcas', marcasData.map(marca => {
      // Convertir fecha de DD/MM/YYYY a YYYY-MM-DD
      const [day, month, year] = marca.fecha_creacion.split('/');
      const formattedDate = `${year}-${month}-${day}`;

      return {
        id: marca.id,
        nombre: marca.nombre,
        fecha_creacion: new Date(formattedDate),
        createdAt: new Date(),
        updatedAt: new Date()
      };
    }), {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Marcas', null, {});
  }
};
