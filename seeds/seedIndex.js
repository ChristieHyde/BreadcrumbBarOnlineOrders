const sequelize = require('../config/connection');
const { Account, 
        Order, 
        Sandwich, 
        Ingredient, 
        SideItem, 
        CreditCard, 
        SandwichOrder, 
        SandwichIngredient,
        ItemOrder } = require('../models');

const accountSeed = require('./accountSeed.json');
const orderSeed = require('./orderSeed.json'); 
const sandwichSeed = require('./sandwichSeed.json'); 
const ingredientSeed = require('./ingredientSeed.json'); 
const sideItemSeed = require('./sideItemSeed.json'); 
const creditCardSeed = require('./creditCardSeed.json'); 
const throughSandwichOrderSeed = require('./throughSandwichOrderSeed.json'); 
const throughSandwichIngredientSeed = require('./throughSandwichIngredientSeed.json');
const throughItemOrderSeed = require('./throughItemOrderSeed.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const accounts = await Account.bulkCreate(accountSeed, {
        individualHooks: true,
        returning: true,
    });
    const creditCards = await CreditCard.bulkCreate(creditCardSeed, {
        individualHooks: true,
        returning: true,
    });
    const orders = await Order.bulkCreate(orderSeed, {
        individualHooks: true,
        returning: true,
    });
    const sandwiches = await Sandwich.bulkCreate(sandwichSeed, {
        individualHooks: true,
        returning: true,
    });
    const ingredients = await Ingredient.bulkCreate(ingredientSeed, {
        individualHooks: true,
        returning: true,
    });
    const sideItems = await SideItem.bulkCreate(sideItemSeed, {
        individualHooks: true,
        returning: true,
    });
    const throughSandwichOrders = await SandwichOrder.bulkCreate(throughSandwichOrderSeed, {
        individualHooks: true,
        returning: true,
    });
    const throughSandwichIngredients = await SandwichIngredient.bulkCreate(throughSandwichIngredientSeed, {
        individualHooks: true,
        returning: true,
    });
    const throughItemOrders = await ItemOrder.bulkCreate(throughItemOrderSeed, {
        individualHooks: true,
        returning: true,
    });

  process.exit(0);
};

seedDatabase();