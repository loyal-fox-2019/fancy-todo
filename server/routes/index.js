const express = require('express')
const router = express.Router()
const userrouter = require('./userrouter')
const todorouter = require('./todorouter')



router.use('/users', userrouter)

router.use('/todos', todorouter)





module.exports=router