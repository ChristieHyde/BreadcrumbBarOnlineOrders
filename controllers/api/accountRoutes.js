const router = require('express').Router();
const { Account, CreditCard, Ingredient, ItemOrder, Order, Sandwich, SandwichIngredient, SandwichOrder, SideItem } = require('../../models');

router.post('/login', async (req, res) => {
    try {
        const accountData = await Account.findOne({ where: { email: req.body.email } });
        if (!accountData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await accountData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.account_id = accountData.id;
        req.session.logged_in = true;
        
        res.json({ account: accountData, message: 'Login successful' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.post('/signup', async (req, res) => {
    try {
      const accountData = await Account.create(req.body);
  
      req.session.save(() => {
        req.session.account_id = accountData.id;
        req.session.logged_in = true;
  
        res.status(200).json(accountData);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = router;