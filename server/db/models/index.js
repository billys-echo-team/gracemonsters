const User = require('./user')
const Order = require('./order')
const Item = require('./item')
const OrderItem = require('./order_item')

//*One to Many
User.hasMany(Order)
Order.belongsTo(User)

//*Many to Many
Order.belongsToMany(Item, {through: 'order_item'})
// Order.hasMany(Item)
Item.belongsToMany(Order, {through: 'order_item'})
// Item.hasMany(Order)

module.exports = {
  User,
  Order,
  Item,
  OrderItem
}
