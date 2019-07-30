const User = require('./user')
const Order = require('./order')
const Item = require('./item')
const Cart = require('./cart')

//*One to Many
User.hasMany(Order)
Order.belongsTo(User)

//*Many to Many
Order.belongsToMany(Item, {through: 'Cart'})
Item.belongsToMany(Cart, {through: 'Cart'})

module.exports = {
  User,
  Order,
  Item,
  Cart
}
