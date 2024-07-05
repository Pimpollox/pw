// models/order.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: 'UserId', as: 'usuario' });
    }
  }
  Order.init({
    fecha_orden: DataTypes.DATE,
    total: DataTypes.FLOAT,
    productos: DataTypes.ARRAY(DataTypes.INTEGER),
    estado: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    direccion: DataTypes.STRING,
    subtotal: DataTypes.FLOAT,
    impuesto: DataTypes.FLOAT,
    envio: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
