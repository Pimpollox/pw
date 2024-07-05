'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Modelo extends Model {
    static associate(models) {
      Modelo.belongsTo(models.Marca, {foreignKey: 'MarcaId', as: 'marca'});
    }
  }
  Modelo.init({
    Serie: DataTypes.STRING,
    imagen: DataTypes.STRING,
    precio: DataTypes.INTEGER,
    Descripcion: DataTypes.STRING,
    Caracteristicas: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    estado: DataTypes.STRING,
    MarcaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Modelo',
  });
  return Modelo;
};