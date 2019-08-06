const router = require('express').Router()
const Order = require('../db/models/order')
const User = require('../db/models/user')

module.exports = router

router.get('/', async (req, res, next) => {
  const orders = await Order.findAll()

  res.send(orders)
})

router.post('/', async (req, res, next) => {
  // const user = await User.findOne({where: {id: req.user.id}})
  const newOrder = await Order.create({
    date: '7/7/7777',
    userId: 1,
    isCart: true,
    payment: 5555555555555555,
    email: 'user@email.com',
    address: '123 fake ave',
    shippingStatus: 'pending'
  })

  res.send(newOrder)
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
