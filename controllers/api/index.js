const router = require('express').Router();
const accountRoutes = require('./accountRoutes');
const orderRoutes = require('./orderRoutes');
const sandwichRoutes = require('./sandwichRoutes');

router.use('/accounts', accountRoutes);
router.use('/orders', orderRoutes);
router.use('/sandwiches', sandwichRoutes);

module.exports = router;