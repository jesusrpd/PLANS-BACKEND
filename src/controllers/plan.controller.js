const planModel = require('../models/plan')

module.exports = {
    getAllPlans,
    createPlan,
    getPlan
}

async function getAllPlans(req,res){
    const plans = await planModel.find().populate('user_create')
    res.status(200).send({success: true, data: plans});
}

async function getPlan(req,res){
    const id = req.params.id
    const plan = await planModel.findOne({_id: id}).populate('user_create')
    res.status(200).send({success: true, data: plan});
}

async function createPlan(req,res){
    const {user_create, name, data} = req.body
    const newPlan = new planModel({user_create, name, data})
    await newPlan.save()
    res.send(newPlan)
}