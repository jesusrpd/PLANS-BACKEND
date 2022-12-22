const {Schema, model} = require('mongoose')

const planSchema = new Schema({
    user_create: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {type: String},
    data: [{type: String, default: ''}]
})

module.exports = model("Plan", planSchema)