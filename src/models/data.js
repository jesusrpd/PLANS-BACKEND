const {Schema, model} = require('mongoose')

const planSchema = new Schema({
    plan: {
        type: Schema.Types.ObjectId,
        ref: 'Plan'
    },
    
    description: {type: String},
    status: {type: Boolean},
    assiggned: {type: Schema.Types.ObjectId, ref: 'User'}
})

module.exports = model("Data", planSchema)