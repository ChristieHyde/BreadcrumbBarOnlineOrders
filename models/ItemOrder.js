const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ItemOrder extends Model {}

ItemOrder.init(
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
    item_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'item',
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
    modelName: 'item_order',
  }
);

module.exports = ItemOrder;
