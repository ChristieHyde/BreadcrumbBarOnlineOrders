const router = require('express').Router();
const { Account, CreditCard, Ingredient, ItemOrder, Order, Sandwich, SandwichIngredient, SandwichOrder, SideItem } = require('../../models');

// create order
router.post('/create', async (req, res) => {
    // Return an order if it exists
    console.log("03");
    if (req.session.order_id) {
        try {
            console.log("04");
            const orderData = await Order.findOne({ where: { id: req.session.order_id } })
            const order = orderData.get({ plain: true });
            res.status(208).json(order);
        } catch (err) {
            res.status(400).json(err);
        }
        return;
    }
    console.log("05");
    try {
        console.log("06");
        console.log(req.session.account_id);
        const orderData = await Order.create({
            account_id: req.session.account_id,
            total_price: 0
        });
        const order = orderData.get({ plain: true });
        console.log(`order ${order.id}`);
        req.session.order_id = order.id;
        req.session.save(() => {
            req.session.order_id = order.id;
        
            res.status(200).json(order);
        });
        console.log(`order id ${req.session.order_id}`);
    } catch (err) {
        console.log("00000");
        res.status(400).json(err);
    }
});

// add to order
router.post('/add/sandwich/:id', async (req, res) => {
    try {
        console.log(`hello ${req.session.order_id}`);
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
        console.log("11111");
        res.status(400).json(err);
    }
});

router.post('/add/sideitem/:id', async (req, res) => {
    try {
        console.log(req.session.order_id);
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