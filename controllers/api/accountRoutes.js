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
      console.log(":(");
      const account = accountData.get({ plain: true });
      req.session.save(() => {
        req.session.account_id = account.id;
        req.session.logged_in = true;
        req.session.order_id = null;
        
        res.json({ account: account, message: 'Login successful' });
      });
      console.log(":/");
      console.log(req.session.account_id);
  
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.post('/signup', async (req, res) => {
    try {
      const accountData = await Account.create(req.body);
  
      const account = accountData.get({ plain: true });
      req.session.save(() => {
        req.session.account_id = account.id;
        req.session.logged_in = true;
        req.session.order_id = null;
  
        res.status(200).json(account);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = router;