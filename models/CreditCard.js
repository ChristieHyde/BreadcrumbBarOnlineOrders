const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class CreditCard extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

CreditCard.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    cardName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cardNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiryDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cvcNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    }
    // extension: account_id
  },
  {
    // TO FIGURE OUT: store credit card information securely
    /*hooks: {
      beforeCreate: async (newCardData) => {
        newCardData.cardName = await bcrypt.hash(newCardData.cardName, 10);
        newCardData.cardNumber = await bcrypt.hash(newCardData.cardNumber, 10);
        newCardData.expiryDate = await bcrypt.hash(newCardData.expiryDate, 10);
        newCardData.cvcNumber = await bcrypt.hash(newCardData.cvcNumber, 10);
        return newCardData;
      },
      beforeUpdate: async (updatedCardData) => {
        updatedCardData.cardName = await bcrypt.hash(updatedCardData.cardName, 10);
        updatedCardData.cardNumber = await bcrypt.hash(updatedCardData.cardNumber, 10);
        updatedCardData.expiryDate = await bcrypt.hash(updatedCardData.expiryDate, 10);
        updatedCardData.cvcNumber = await bcrypt.hash(updatedCardData.cvcNumber, 10);
        return updatedCardData;
      },
    },*/
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'credit_card',
  }
);

module.exports = CreditCard;
