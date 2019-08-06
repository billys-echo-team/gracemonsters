const router = require('express').Router()
const Order = require('../db/models/order')

module.exports = router

router.get('/', async (req, res, next) => {
  const orders = await Order.findAll()

  res.send(orders)
})

router.get('/:id', async (req, res, next) => {
  const order = await Order.findByPk(req.params.id)

  res.send(order)
})

router.put('/:id', async (req, res, next) => {
  const checkoutOrder = await Order.findByPk(req.params.id)
  checkoutOrder.update({isCart: false})
  res.send(checkoutOrder)
})
