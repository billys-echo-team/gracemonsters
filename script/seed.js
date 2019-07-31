const db = require('../server/db')
const User = require('../server/db/models/user')
const Item = require('../server/db/models/item')
const Order = require('../server/db/models/order')

const seed = async () => {
  try {
    await db.sync({force: true})
    //*User dummy data
    await User.create({
      userName: 'ashKetchum',
      firstName: 'Ash',
      lastName: 'Ketchum',
      email: 'ashe@email.com',
      address: '123 Pallet Town',
      payment: null,
      password: '123',
      imageUrl:
        'https://cdn.bulbagarden.net/upload/thumb/5/54/Ash_SM.png/300px-Ash_SM.png'
    })
    await User.create({
      userName: 'thirstyBrock',
      firstName: 'Brock',
      lastName: 'Takeshi',
      email: 'brock@email.com',
      address: '123 Kanto Region',
      payment: null,
      password: '456',
      imageUrl: 'https://cdn.bulbagarden.net/upload/6/6a/Brock_SM.png'
    })
    await User.create({
      userName: 'iamMisty',
      firstName: 'Misty',
      lastName: 'Sakura',
      email: 'misty@email.com',
      address: '123 Cerulean City',
      payment: null,
      password: '789',
      imageUrl:
        'https://cdn.bulbagarden.net/upload/thumb/f/f6/Lets_Go_Pikachu_Eevee_Misty.png/367px-Lets_Go_Pikachu_Eevee_Misty.png'
    })
    //*Items dummy data
    await Item.create({
      name: 'Bulbasaur',
      element: 'grass',
      price: 20,
      stock: 1,
      imageUrl:
        'https://cdn.bulbagarden.net/upload/thumb/2/21/001Bulbasaur.png/500px-001Bulbasaur.png',
      description: 'its a bulbasaur'
    })

    await Item.create({
      name: 'Charmander',
      element: 'fire',
      price: 20,
      stock: 1,
      imageUrl:
        'https://cdn.bulbagarden.net/upload/thumb/7/73/004Charmander.png/500px-004Charmander.png',
      description: 'its a charmander'
    })
    await Item.create({
      name: 'Squirtle',
      element: 'water',
      price: 20,
      stock: 1,
      imageUrl:
        'https://cdn.bulbagarden.net/upload/thumb/3/39/007Squirtle.png/500px-007Squirtle.png',
      description: 'its a squirtle'
    })
    await Order.create({
      date: '7/7/7777',
      userId: 1,
      isCart: true,
      payment: 5555555555555555,
      email: 'bulbasaurusrex@pokeman.com',
      address: '123 fake st',
      shippingStatus: 'pending'
    })
    await Order.create({
      date: '7/7/7777',
      userId: 1,
      isCart: true,
      payment: 5555555555555555,
      email: 'pikachu@pokeman.com',
      address: '123 fake st',
      shippingStatus: 'pending'
    })
    await Order.create({
      date: '12/12/7777',
      userId: 2,
      isCart: true,
      payment: 5555555555555555,
      email: 'charmander@pokeman.com',
      address: '123 fake st',
      shippingStatus: 'pending'
    })
    console.log(`
      Seed success!
    `)
  } catch (err) {
    console.error(`
      Oh noes!
    `)
    console.error(err.stack)
  }
}

seed()

module.exports = seed
