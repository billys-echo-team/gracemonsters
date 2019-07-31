const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  date: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
      isDate: true
    }
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  payment: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  address: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  shippingStatus: {
    type: Sequelize.ENUM,
    values: ['pending', 'shipped', 'delivered']
  }
})

module.exports = Order
