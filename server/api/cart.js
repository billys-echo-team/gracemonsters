const router = require('express').Router()
const {order_item, Order, Item} = require('../db/models')

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
        const item = await Item.findByPk(3)
        cart.addItem(item) //, {through: {quantity: 5}})
        res.send(cart)
      } else {
        const newCart = await Order.create({
          where: {userId: req.user.id, isCart: true}
        })
        const item = await Item.findByPk(1)
        newCart.addItem(item, {through: {quantity: 5}})
        res.send(newCart)
      }
    } else {
      res.sendstatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/', async (req, res, next) => {
  if (req.user) {
    const cart = await Order.findOne({
      where: {userId: req.user.id, isCart: true},
      include: [
        {
          model: Item
        }
      ]
    })
    if (cart) {
      const item = await Item.findByPk(req.body.itemId)
      cart.removeItem(item)
      res.send(cart.items)
    } else {
      res.sendStatus(404)
    }
  } else {
    res.sendStatus(404)
  }
})

// include: [
//   {
//     model: Item
//   }
// ],
// defaults: {isCart: false}
