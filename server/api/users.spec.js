/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const brocksEmail = 'brock@email.com'

    beforeEach(() => {
      return User.create({
        userName: 'thirstyBrock',
        firstName: 'Brock',
        lastName: 'Takeshi',
        email: 'brock@email.com',
        address: '123 Kanto Region',
        payment: null,
        password: '456',
        imageUrl: 'https://cdn.bulbagarden.net/upload/6/6a/Brock_SM.png',
        isAdmin: true
      })
    })

    xit('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(brocksEmail)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
