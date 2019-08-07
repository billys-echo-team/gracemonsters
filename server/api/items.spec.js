/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Item = db.model('item')

describe('Item routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/shop', () => {
    beforeEach(() => {
      return Item.create({
        name: 'Bulbasaur',
        element: 'grass',
        price: 20,
        stock: 1,
        imageUrl:
          'https://cdn.bulbagarden.net/upload/thumb/2/21/001Bulbasaur.png/500px-001Bulbasaur.png',
        description: 'its a bulbasaur'
      })
    })

    it('GET /api/shop', async () => {
      const res = await request(app)
        .get('/api/shop')
        .expect(200)

      expect(res.body).to.be.an('array')
      //   expect(res.body[0].name).to.be.equal('Bulbasaur')
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
