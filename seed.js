const db = require('./server/db')
const User = require('./server/db/models/user')
const Item = require('./server/db/models/item')

const seed = async () => {
  try {
    await db.sync({force: true})
    await User.create({
      userName: 'ashKetchum',
      firstName: 'Ash',
      lastName: 'Ketchum',
      email: 'ashe@email.com',
      address: '123 Pallet Town',
      payment: null,
      password: '123'
    })
    await Item.create({
      name: 'Bulbasaur',
      element: 'grass',
      price: 20,
      stock: 1,
      description: 'its a bulbasaur'
    })
    console.log(`
      Seed success!
    `)
    db.close()
  } catch (err) {
    console.error(`
      Oh noes!
    `)
    console.error(err.stack)
    db.close()
  }
}

seed()
