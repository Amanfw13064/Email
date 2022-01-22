const express=require('express')

const userController=require('./constrollers/userController')

const adminController=require('./constrollers/adminController')

const app=express()

app.use(express.json())

app.use('/user',userController)

app.use('/admin',adminController)

module.exports=app