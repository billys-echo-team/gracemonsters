const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

function isAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    return next()
  } else {
    res.redirect('/nopermission')
  }
}

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    console.log('******', req.user.isAdmin)
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', isAdmin, async (req, res, next) => {
  const foundUser = await User.findByPk(req.params.id)

  res.send(foundUser)
})
