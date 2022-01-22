const jwt=require('jsonwebtoken')
require('dotenv').config()
const verfyToken=(token)=>{
    return new Promise((resolve,reject)=>{
        jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decoded)=>{
            if(err) return reject(err)
            else{
                resolve(decoded)
            }
        })
    })
}

module.exports=async(req,res,next)=>{
      if(!req?.headers?.authorization){
          return res.status(400).send({messsage:"Bad Request"})
      }
      const bearertoken=req?.headers?.authorization
      if(!bearertoken.startsWith("Bearer "))
      {
        return res.status(400).send({messsage:"Bad Request"}) 
      }
      const token=bearertoken.split(" ")[0]
      const verify=verfyToken(token)
      if(!verify){
          return res.status(400).send({message:"Not Valid"})
      }
      next()
}