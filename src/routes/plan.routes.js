const r = require('express').Router()
const controllers = require('../controllers/plan.controller')

r.get('/', controllers.getAllPlans)

r.get('/:id', controllers.getPlan)

r.post('/', controllers.createPlan)

module.exports = r