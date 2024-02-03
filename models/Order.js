const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Order extends Model {}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    account_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'account',
        key: 'id',
      },
    },
    card_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'credit_card',
        key: 'id',
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'order',
  }
);

// TO DO: calculate total price based on sandwiches and side items ordered

module.exports = Order;