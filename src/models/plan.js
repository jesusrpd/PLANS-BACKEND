const {Schema, model} = require('mongoose')

const planSchema = new Schema({
    user_create: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {type: String},
    description: [{
        name: {type: String, default: ''},
        status: {type: Boolean},
        assiggned:{type: String}
    }]
})

module.exports = model("Plan", planSchema)