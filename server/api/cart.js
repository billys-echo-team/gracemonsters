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
      const cartItem = await Order.findOne({
        where: {userId: req.user.id, isCart: true},
        include: [
          {
            model: Item,
            where: {id: req.body.item.id}
          }
        ]
      })

      const item = await Item.findByPk(req.body.item.id)
      const stockUpdate = (item.stock += 1)

      const newCount = (cartItem.items[0].order_item.quantity -= 1)
      await OrderItem.update(
        {quantity: newCount},
        {where: {orderId: cartItem.id, itemId: req.body.item.id}}
      )
      item.update({stock: stockUpdate})
      res.send(200)
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

    const item = await Item.findByPk(req.body.item.id)
    cart.removeItem(item)
    item.update({stock: item.stock + req.body.item.order_item.quantity})
    res.send(cart.items)
  } else {
    res.sendStatus(404)
  }
})
