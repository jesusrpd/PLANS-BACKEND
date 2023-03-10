const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express()
const config = require('./config')
const userRoutes = require('./routes/user.routes')
const plansRoutes = require('./routes/plan.routes')
const dataRoutes = require('./routes/data.routes')

mongoose.connect(config.db_uri)

const db = mongoose.connection;

db.on('error', (err)=> {
    console.log(`${err} ERROR AL CONECTAR CON LA BD`);
})

db.once('open', ()=> {
    console.log('DATABASE IS CONECTED');
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan("dev"))

app.get('/', (req, res) => {
    res.send('Hola')
})

app.use('/users', userRoutes)
app.use('/plans', plansRoutes)
app.use('/data', dataRoutes)

module.exports = app