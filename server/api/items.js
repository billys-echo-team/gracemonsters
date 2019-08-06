const router = require('express').Router()
const {Item, Order, OrderItem} = require('../db/models')

module.exports = router

function isAdmin(req, res, next) {
  if (!req.user) {
    res.redirect('/nopermission')
  } else if (req.user && req.user.isAdmin) {
    return next()
  } else {
    res.redirect('/nopermission')
  }
}

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
      const cartItem = await Order.findOne({
        where: {userId: req.user.id, isCart: true},
        include: [
          {
            model: Item,
            where: {id: req.params.id}
          }
        ]
      })
      const item = await Item.findByPk(req.params.id)
      const stockUpdate = (item.stock -= 1)
      if (cartItem) {
        const newCount = (cartItem.items[0].order_item.quantity += 1)
        await OrderItem.update(
          {quantity: newCount},
          {where: {orderId: cartItem.id, itemId: req.params.id}}
        )
        item.update({stock: stockUpdate})
        res.send(200)
      } else {
        const newCart = await Order.findOne({
          where: {userId: req.user.id, isCart: true}
        })
        newCart.addItem(item, {through: {quantity: 1}})
        item.update({stock: stockUpdate})
        res.send(newCart)
      }
    } else {
      res.sendstatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', isAdmin, async (req, res, next) => {
  const foundItem = await Item.findByPk(req.params.id)
  foundItem.destroy()
  res.send(`Goodbye`)
})
