const Sequelize = require('sequelize')
const db = require('../db')

const order_item = db.define('order_item', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

module.exports = order_item
