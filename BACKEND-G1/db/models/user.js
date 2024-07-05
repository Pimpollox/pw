'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Order, { foreignKey: 'UserId', as: 'ordenes' });
    }
  }
  User.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    correo: DataTypes.STRING,
    contraseña: DataTypes.STRING,
    fecha_registro: DataTypes.DATE,
    estado: DataTypes.STRING,
    tipo: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};