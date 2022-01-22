const mongoose=require('mongoose')

const adminSchema=new mongoose.Schema({
    name:String,
    email:{type:String,required:true},
})

module.exports=mongoose.model('admin',adminSchema)