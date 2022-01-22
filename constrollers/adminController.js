const express=require('express')

const router=express.Router()

const Admin=require('../models/adminModel')

router.post('',async(req,res)=>{
    try{
        const admin=await Admin.create(req.body)
        return res.status(201).send(admin)
    }
    catch(err){
        return res.status(500).send(err.message)
    }
})

module.exports=router;