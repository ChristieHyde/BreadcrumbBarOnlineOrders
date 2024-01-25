const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class SandwichOrder extends Model {}

SandwichOrder.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    order_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'order',
          key: 'id',
          unique: false
        }
    },
    sandwich_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'sandwich',
          key: 'id',
          unique: false
        }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'sandwich_order',
  }
);

module.exports = SandwichOrder;
