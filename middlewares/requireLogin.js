const jwt=require("jsonwebtoken");
const Jwt_secret="faslejkhtutbjgbj";
const mongoose=require("mongoose");
const USER =mongoose.model("USER");

module.exports=(req,res,next)=>{
    const {authorization}=req.headers;
    if(!authorization){
        return res.status(401).json({error:"You must have logged in"})

    }
    // res.json("ok");
     const token=authorization.replace("Bearer ","")
     jwt.verify(token,Jwt_secret,(err,payload)=> {
        if(err)
        {
            return res.status(401).json({error:"you must have logged in 2"})
        }
        const {_id}=payload
        USER.findById(_id).then(userData=>{
            req.user=userData;
            // console.log(userData);
            next();
        })
     })
    
}