const User = require('./user')
const Order = require('./order')
const Item = require('./item')
const OrderItem = require('./order_item')

//*One to Many
User.hasMany(Order)
Order.belongsTo(User)

//*Many to Many
Order.belongsToMany(Item, {through: 'cart'})
Item.belongsToMany(Order, {through: 'cart'})

module.exports = {
  User,
  Order,
  Item,
  OrderItem
}
