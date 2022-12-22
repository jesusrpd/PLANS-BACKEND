const planModel = require('../models/plan')

module.exports = {
    getAllPlans,
    createPlan,
    getPlan,
    addPendient,
    removePendient
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
    const {user_create, name, description} = req.body
    const newPlan = new planModel({user_create, name, description})
    await newPlan.save()
    res.send(newPlan)
}

async function addPendient(req,res){
    const id = req.params.id
    const plan = await planModel.findOne({_id: id})
    if(!plan) return res.status(404).send({success: false, data: null})
    console.log(req.body);
    plan.description = plan.description.concat(req.body)
    const save_plan = await plan.save()

    res.status(201).send({success: true, data: save_plan})
}

async function removePendient(req,res){
    const id = req.params.id
    const plan = await planModel.findOne({_id: id})
    if(!plan) return res.status(404).send({success: false, data: null})
    console.log(req.params.pent);
    plan.description = plan.description.filter( d =>{
        
        console.log(JSON.stringify(d._id));
        if(JSON.stringify(d._id) !== req.params.pent){
            return d
        }else{
            return
        }
    })
    console.log(plan.description);
    const save_plan = await plan.save()
    res.status(201).send({success: true, data: save_plan})
}