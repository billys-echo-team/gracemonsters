const router = require('express').Router()
const {OrderItem, Order, Item} = require('../db/models')

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
      res.json(cart)
    } else {
      res.json([])
    }
  } catch (error) {
    next(error)
  }
})
// localhost:8080/cart
router.put('/', async (req, res, next) => {
  try {
    if (req.user) {
      const cart = await Order.findOne({
        where: {userId: req.user.id, isCart: true}
      })
      if (cart) {
        const item = await Item.findByPk(1)
        cart.addItem(item, {through: {quantity: 2}})
        res.send(cart)
      } else {
        const newCart = await Order.create({
          where: {userId: req.user.id, isCart: true}
        })
        const item = await Item.findByPk(1)
        newCart.addItem(item, {through: {quantity: 2}})
        res.send(newCart)
      }
    } else {
      res.sendstatus(404)
    }
  } catch (error) {
    next(error)
  }
})

// include: [
//   {
//     model: Item
//   }
// ],
// defaults: {isCart: false}
