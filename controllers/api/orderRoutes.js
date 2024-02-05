const router = require('express').Router();
const { Account, CreditCard, Ingredient, ItemOrder, Order, Sandwich, SandwichIngredient, SandwichOrder, SideItem } = require('../../models');

// create order
router.post('/create', async (req, res) => {
    // Return an order if it exists
    console.log(req.session);
    if (req.session.order_id) {
        console.log("1");
        const orderData = await Order.findOne({ where: { id: req.session.order_id } })
        res.status(208).json(orderData);
        return;
    }
    try {
        console.log("2");
        const orderData = await Order.create({
            account_id: req.session.user_id,
            total_price: 0
        });
        req.session.save(() => {
            req.session.order_id = orderData.id;
        
            res.status(200).json(orderData);
        });
        console.log("created");
    } catch (err) {
        res.status(400).json(err);
    }
});

// add to order
router.post('/add/sandwich/:id', async (req, res) => {
    try {
        // attach to order
        const itemData = await SandwichOrder.create({
            order_id: req.session.order_id,
            sandwich_id: req.params.id
        });
        // add to total price
        const order = await Order.findOne({ where: { id: req.session.order_id } });
        const sandwich = await Sandwich.findOne({ where: { id: req.params.id } });
        console.log('3');
        const newTotal = parseFloat(order.total_price) + parseFloat(sandwich.price);
        console.log(newTotal);
        await order.update({total_price: newTotal});
        console.log('7');
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/add/sideitem/:id', async (req, res) => {
    try {
        const itemData = await ItemOrder.create({
            order_id: req.session.order_id,
            item_id: req.params.id
        });
        // add to total price
        const order = await Order.findOne({ where: { id: req.session.order_id } });
        const sideItem = await SideItem.findOne({ where: { id: req.params.id } });
        order.total_price = order.total_price + sideItem.price;
        await order.save();
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;