'use strict';
const fs = require('fs');
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../json/usuarios.json'), 'utf-8'));

    await queryInterface.bulkInsert('Users', users.map(user => {
      // Convertir fecha de DD/MM/YYYY a YYYY-MM-DD
      const [day, month, year] = user.fecha_registro.split('/');
      const formattedDate = `${year}-${month}-${day}`;
      
      return {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        correo: user.correo,
        contraseña: user.contraseña,
        fecha_registro: new Date(formattedDate),
        estado: user.estado,
        tipo: user.tipo,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    }), {});
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
