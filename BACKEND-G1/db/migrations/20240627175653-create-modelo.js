'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Modelos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Serie: {
        type: Sequelize.STRING
      },
      imagen: {
        type: Sequelize.TEXT
      },
      precio: {
        type: Sequelize.INTEGER
      },
      Descripcion: {
        type: Sequelize.STRING(500)
      },
      Caracteristicas: {
        type: Sequelize.STRING(500)
      },
      stock: {
        type: Sequelize.INTEGER
      },
      estado: {
        type: Sequelize.STRING
      },
      MarcaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Marcas',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Modelos');
  }
};