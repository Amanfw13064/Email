const express=require('express')

const router=express.Router()

const User=require('../models/userModel')

const Admin=require('../models/adminModel')

const transporter=require('../config/email')

router.post('',async(req,res)=>{
    try{
      
        let user=await User.create(req.body);
        let admin=await Admin.find().lean().exec()
        let adminArray=[]
        admin.map(({email})=>{
            adminArray.push(email)
        })
        console.log(adminArray)
      

        console.log(user.first_name)
        const message1 = {
            from: "Amanshar@gmail.com",
            to: user.email,
            subject: `Welcome to masai system ${user.first_name} ${user.last_name}`,
            text: `hi ${user.first_name},Please Confirm your email`,
            html: `<p>hi ${user.first_name},Please Confirm your email <button>Confirm</button></p>`
          };  
            const message2 = {
                from: "operation@gmail.com",
                to: adminArray,
                subject: `${user.first_name} ${user.last_name} has registered with us`,
                text: `hi ${user.first_name},Please Confirm your email`,
                html: `<p>Please welcome ${user.first_name} ${user.last_name}</p>`
              };
              transporter.sendMail(message2)
          transporter.sendMail(message1)
       
        return res.status(200).send(user)
    }
    catch(err){
        return res.status(500).send(err.message)
    }
})

router.get('',async(req,res)=>{
    try{
        const page=+req.query.page;
        const size=+req.query.size;
        const skip=(page-1)*size;
        const totalpage=Math.ceil((await User.find().count())/size)
        const item=await User.find().skip(skip).limit(size).lean().exec()
        return res.status(200).send({item,totalpage})
    }
    catch(err)
    {
        return res.status(500).send(err.message)
    }
})

module.exports=router;