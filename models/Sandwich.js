const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Sandwich extends Model {}

Sandwich.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    item_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    in_stock: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'sandwich',
  }
);

module.exports = Sandwich;