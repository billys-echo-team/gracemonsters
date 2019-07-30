const db = require('./server/db')
const User = require('./server/db/models/user')

const seed = async () => {
  try {
    await db.sync({force: true})
    await User.create({
      email: 'ashe@email.com',
      password: '123'
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
