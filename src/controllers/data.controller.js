const dataModel = require('../models/data')
const planModel = require('../models/plan')

module.exports = {
    getDatas,
    createData,
    deleteData,
    dataByPLan
}

async function getDatas(req,res){
    const datas = await dataModel.find().populate('assiggned',{username:1})
    res.send({success: true, data: datas})
}

async function dataByPLan(req,res){
    const datas = await dataModel.find({plan: req.params.plan}).populate('assiggned',{username: 1}).populate('plan',{name:1,_id: 0})
    res.status(200).send({success: true, data: datas})
}

async function createData(req, res){
    const {description, plan, status, assiggned} = req.body
    const newData = new dataModel({description, plan, status, assiggned: assiggned})
    await newData.save()
    res.send({success: true, data: 'newData'})
}

async function deleteData(req,res){
    await dataModel.findByIdAndRemove({_id: req.params.id})
    res.status(201).send({success: true, data: 'Data elmianda'})
}