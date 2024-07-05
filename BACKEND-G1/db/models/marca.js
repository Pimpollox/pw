'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Marca extends Model {
    static associate(models) {
      Marca.hasMany(models.Modelo, {foreignKey: 'MarcaId', as: 'modelos'});
    }
  }
  Marca.init({
    nombre: DataTypes.STRING,
    fecha_creacion: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Marca',
  });
  return Marca;
};