const router = require('express').Router();
const { Account, CreditCard, Ingredient, ItemOrder, Order, Sandwich, SandwichIngredient, SandwichOrder, SideItem } = require('../../models');

router.get("/:id", async (req, res) => {
    try {
        const sandwichData = await Sandwich.findByPk(req.params.id, {});
        res.status(200).json(sandwichData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;