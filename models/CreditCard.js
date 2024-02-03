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
    card_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiry_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cvc_number: {
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
        newCardData.card_number = await bcrypt.hash(newCardData.card_number, 10);
        newCardData.expiry_date = await bcrypt.hash(newCardData.expiry_date, 10);
        newCardData.cvc_number = await bcrypt.hash(newCardData.cvc_number, 10);
        return newCardData;
      },
      beforeUpdate: async (updatedCardData) => {
        updatedCardData.cardName = await bcrypt.hash(updatedCardData.cardName, 10);
        updatedCardData.card_number = await bcrypt.hash(updatedCardData.card_number, 10);
        updatedCardData.expiry_date = await bcrypt.hash(updatedCardData.expiry_date, 10);
        updatedCardData.cvc_number = await bcrypt.hash(updatedCardData.cvc_number, 10);
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
