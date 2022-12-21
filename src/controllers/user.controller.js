const userModel = require('../models/user')
const config = require('../config')
const jwt = require('jsonwebtoken')

module.exports = {
    getAllUsers,
    createUser,
    signin
}

async function getAllUsers(req,res){
    const users = await userModel.find()
    res.send(users)
}

async function createUser(req,res){
    const {username, password} = req.body
    const newUser = new userModel({username, passwordEncrypt: password})

    newUser.passwordEncrypt = await newUser.encryptPassword(password)
    await newUser.save()
    res.send(newUser)
}

async function signin (req,res){
    const {username, password} = req.body;

  // Buscamos al usuario en la BD 
  const user = await userModel.findOne({username});
  const passwordIsValid = await user.comparePassword(password);

  if(!(user && passwordIsValid)){
    return res.status(401).json({
      error: 'username o contraseña invalidos'
    });
  }
  
  // Generamos token de autenticación si la contraseña es correcta
  const token = jwt.sign({id: user._id}, config.secret,{
    expiresIn: 86400
  })

  res.status(200).json({success: true, data: {token, user}});
}