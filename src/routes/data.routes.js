const r = require('express').Router()
const controller = require('../controllers/data.controller')

r.get('/', controller.getDatas)

r.get('/:plan', controller.dataByPLan)

r.post('/', controller.createData)

r.delete('/:id', controller.deleteData)

module.exports = r