const Account = require('./Account');
const Order = require('./Order');
const Sandwich = require('./Sandwich');
const Ingredient = require('./Ingredient');
const SideItem = require('./SideItem');
const CreditCard = require('./CreditCard');
const SandwichOrder = require('./SandwichOrder');
const SandwichIngredient = require('./SandwichIngredient');
const ItemOrder = require('./ItemOrder');

// ASSOCIATIONS:

// One account can place many orders
Account.hasMany(Order, {
    foreignKey: 'account_id',
    onDelete: 'CASCADE',
});

Order.belongsTo(Account, {
    foreignKey: 'account_id'
});

// Many orders can contain many sandwiches
Order.belongsToMany(Sandwich, {
    through: {
        model: SandwichOrder,
        unique: false,
    },
    as: 'sandwiches'
});

Sandwich.belongsToMany(Order, {
    through: {
        model: SandwichOrder,
        unique: false
    },
    as: 'orders'
});

// Many sandwiches can contain many ingredients
Sandwich.belongsToMany(Ingredient, {
    through: {
        model: SandwichIngredient,
        unique: false,
    },
    as: 'ingredients'
});

Ingredient.belongsToMany(Sandwich, {
    through: {
        model: SandwichIngredient,
        unique: false
    },
    as: 'sandwiches'
});

// Many orders can contain many non-sandwich items
Order.belongsToMany(SideItem, {
    through: {
        model: SideItem,
        unique: false,
    },
    as: 'side_items'
});

SideItem.belongsToMany(Order, {
    through: {
        model: ItemOrder,
        unique: false
    },
    as: 'orders'
});

// One order is paid with one credit card
Order.hasOne(CreditCard, {
    foreignKey: 'card_id',
    onDelete: 'CASCADE',
});

CreditCard.belongsTo(Order, {
    foreignKey: 'id',
    onDelete: 'CASCADE',
});

// extension: account-creditcard association

module.exports = {
  Account,
  Order,
  Sandwich,
  Ingredient,
  SideItem,
  CreditCard,
  SandwichOrder,
  SandwichIngredient,
  ItemOrder
};
