const Sequelize = require('sequelize')
const db = require('../db')

const orderItem = db.define('orderItem', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

module.exports = orderItem
