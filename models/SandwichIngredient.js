const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class SandwichIngredient extends Model {}

SandwichIngredient.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    sandwich_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'sandwich',
          key: 'id',
          unique: false
        }
    },
    ingredient_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'ingredient',
          key: 'id',
          unique: false
        }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'sandwich_ingredient',
  }
);

module.exports = SandwichIngredient;
