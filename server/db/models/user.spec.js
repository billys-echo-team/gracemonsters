/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let Ash

      beforeEach(async () => {
        Ash = await User.create({
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
      })

      it('returns true if the password is correct', () => {
        expect(Ash.correctPassword('123')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(Ash.correctPassword('124')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
