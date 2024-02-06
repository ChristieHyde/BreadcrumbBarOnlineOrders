const router = require('express').Router();
const { Account, CreditCard, Ingredient, ItemOrder, Order, Sandwich, SandwichIngredient, SandwichOrder, SideItem } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    if (!req.session.logged_in) {
        res.render('login');
        return;
    }
    
    res.redirect('/profile');
})


router.get('/login', async (req, res) => {
    res.render('login');
})

router.get('/homepage', async (req, res) =>{
    if (!req.session.logged_in) {
        res.render('login');
        return;
    }
    res.render('homepage');
});

router.get('/profile', withAuth, async (req, res) =>{
    if (!req.session.logged_in) {
        res.render('login');
        return;
    }
    try {
        const accountData = await Account.findByPk(req.session.account_id, {
          attributes: { exclude: ['password'] },
          include: [{ model: Project }],
        });
    
        const account = accountData.get({ plain: true });
    
        res.render('profile', {
          ...account,
          logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/menu', async (req, res) => {
    if (!req.session.logged_in) {
        res.render('login');
        return;
    }
    try {
        // Obtain and parse sandwiches and side items
        const sandwichData = await Sandwich.findAll({
            where: {
                in_stock: true
            },
            include: [
                {
                    model: Ingredient,
                    through: SandwichIngredient,
                    attributes: ['item_name'],
                    as: "ingredients"
                },
            ],
        });
        const sandwiches = sandwichData.map((sandwich) => sandwich.get({ plain: true }));

        const sideItemData = await SideItem.findAll({
            where: {
                in_stock: true
            },
        });
        const sideItems = sideItemData.map((sideItem) => sideItem.get({ plain: true }));

        const menu = {sandwiches, sideItems}

        res.render('menu', {
            ...menu,
            logged_in: req.session.logged_in
          });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/checkout', async (req, res) =>{
    if (!req.session.logged_in) {
        res.render('login');
        return;
    }
    try {
        const orderData = await Order.findByPk(req.session.order_id || order_id, {
            include: [
                {
                    model: Sandwich,
                    through: SandwichOrder,
                    attributes: ['item_name'],
                    as: "sandwiches"
                },
                {
                    model: SideItem,
                    through: ItemOrder,
                    attributes: ['item_name'],
                    as: "side_items"
                },
              ],
        });
        const order = orderData.get({ plain: true });
        res.render('checkout', {
            ...order,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;