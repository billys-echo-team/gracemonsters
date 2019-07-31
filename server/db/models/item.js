const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  element: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/12ecb7ae-7059-48df-a4f8-2e3fb7858606/d47rmjf-de88a574-49c8-4dcf-9df4-7e11722e8bec.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzEyZWNiN2FlLTcwNTktNDhkZi1hNGY4LTJlM2ZiNzg1ODYwNlwvZDQ3cm1qZi1kZTg4YTU3NC00OWM4LTRkY2YtOWRmNC03ZTExNzIyZThiZWMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.loswJAzDdppbY9aZ-eQs3DKvAdY7W91eosZhapx7gFU'
  },
  price: {
    type: Sequelize.DECIMAL,
    validate: {
      //   isFloat: true,
      min: 0.0
      //*no maximum price
    }
  },
  stock: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0.0
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Item
