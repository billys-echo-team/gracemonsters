const router = require('express').Router()
const {Cart, Order} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const cart = await Cart.findAll({
        include: [
          {
            model: Order,
            where: {
              userId: req.user.id,
              isCart: true
            }
          }
        ]
      })
      res.json(cart)
    } else {
      res.json([])
    }
  } catch (error) {
    next(error)
  }
})
