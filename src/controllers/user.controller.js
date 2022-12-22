const userModel = require('../models/user')
const config = require('../config')
const jwt = require('jsonwebtoken')

module.exports = {
    getAllUsers,
    createUser,
    signin,
    getOneUser
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
    console.log(req.body);
  // Buscamos al usuario en la BD 
  const user = await userModel.findOne({username});
  if(!user) return res.status(404).send({
    error: 'Usuario no encontrado'
  })
  const passwordIsValid = await user.comparePassword(password);

  if(!(user && passwordIsValid)){
    return res.status(401).send({
      error: 'username o contraseña invalidos'
    });
  }
  
  // Generamos token de autenticación si la contraseña es correcta
  const token = jwt.sign({id: user._id}, config.secret,{
    expiresIn: 86400
  })

  res.status(200).send({success: true, data: {token, user}});
}

async function getOneUser(req,res){
  const id = req.params.id
  const user = await userModel.findOne({_id:id})
  res.send({success: true, data: user})
}