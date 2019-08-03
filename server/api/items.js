const router = require('express').Router()
const {Item, Order} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const items = await Item.findAll()
    res.json(items)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    let data = await Item.findByPk(req.params.id)
    res.json(data)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    if (req.user) {
      const cart = await Order.findOne({
        where: {userId: req.user.id, isCart: true}
      })
      if (cart) {
        const item = await Item.findByPk(req.params.id)
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
