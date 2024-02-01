const router = require('express').Router();
const { Account, CreditCard, Ingredient, ItemOrder, Order, Sandwich, SandwichIngredient, SandwichOrder, SideItem } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
      }
    
      res.render('login');
})

router.get('/profile', async (req, res) =>{
    res.render('profile');
});

module.exports = router;