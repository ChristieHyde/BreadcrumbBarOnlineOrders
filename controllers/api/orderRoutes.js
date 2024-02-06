const router = require('express').Router();
const { Account, CreditCard, Ingredient, ItemOrder, Order, Sandwich, SandwichIngredient, SandwichOrder, SideItem } = require('../../models');

// create order
router.post('/create', async (req, res) => {
    // Return an order if it exists
    if (req.session.order_id) {
        try {
            const orderData = await Order.findOne({ where: { id: req.session.order_id } })
            const order = orderData.get({ plain: true });
            res.status(208).json(order);
        } catch (err) {
            res.status(400).json(err);
        }
        return;
    }
    try {
        const orderData = await Order.create({
            account_id: req.session.account_id,
            total_price: 0
        });
        const order = orderData.get({ plain: true });
        req.session.order_id = order.id;
        req.session.save(() => {
            req.session.order_id = order.id;
        
            res.status(200).json(order);
        });
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
        const newTotal = parseFloat(order.total_price) + parseFloat(sandwich.price);
        await order.update({total_price: newTotal});
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/add/sideitem/:id', async (req, res) => {
    try {
        // attach to order
        const itemData = await ItemOrder.create({
            order_id: req.session.order_id,
            side_item_id: req.params.id
        });
        // add to total price
        const order = await Order.findOne({ where: { id: req.session.order_id } });
        const sideItem = await SideItem.findOne({ where: { id: req.params.id } });
        const newTotal = parseFloat(order.total_price) + parseFloat(sideItem.price);
        await order.update({total_price: newTotal});

    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;