const router = require('express').Router()
const {Cart, Order, Item} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const cart = await Order.findOne({
        where: {userId: req.user.id, isCart: true},
        include: [
          {
            model: Item
          }
        ]
      })
      res.json(cart.items)
    } else {
      res.json([])
    }
  } catch (error) {
    next(error)
  }
})
