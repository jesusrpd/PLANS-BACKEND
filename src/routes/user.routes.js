const r = require('express').Router()
const controllers = require('../controllers/user.controller')

r.get('/', controllers.getAllUsers)

r.post('/', controllers.createUser)

r.post('/signin', controllers.signin)

module.exports = r