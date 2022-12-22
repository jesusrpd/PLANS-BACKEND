const {Schema, model} = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    username: {type: String, default: ''},
    passwordEncrypt: {type: String},
})

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.passwordEncrypt);
  }

module.exports = model('User', userSchema)