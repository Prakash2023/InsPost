const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");
const USER = mongoose.model("USER");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const requireLogin = require("../middlewares/requireLogin");
const Jwt_secret="faslejkhtutbjgbj";


router.post("/signup",(req,res)=>{
    const {name,userName,email,password}=req.body;
    if(!name||!email||!userName||!password){
        return res.status(422).json({error:"please add all the details"})
    }
    USER.findOne({$or:[{email:email},{userName:userName}]}).then
    ((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"Email or Username already exist"})
        }
        bcrypt.hash(password,12).then((hashedPassword)=>{
            const user=new USER({
                name,
                userName,
                email,
                password: hashedPassword
            })
            user.save()
            .then(user=>{res.json({message: "saved successfully"})})
            .catch(err=>{console.log(err)})
        })
        
    })
   
})
router.post("/signin",(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        return res.status(422).json({error:"please add email and password"})
    }
    USER.findOne({email:email}).then((savedUser)=>{
        if(!savedUser)
        {
            return res.status(422).json({error:"Invalid Email"})
        }
        bcrypt.compare(password,savedUser.password).then(
            (match)=>{
                if(match){
                    // return res.status(200).json({message:"Signed Successfully"})
                    const token=jwt.sign({_id:savedUser.id},Jwt_secret)
                    const {_id,name,email,userName}=savedUser;
                    res.json({token,user:{_id,name,email,userName}});
                   
                    // console.log({token,user:{_id,name,email,userName}});
                }
                else{
                    return res.status(422).json({error:"Invalid Password"})
                }
            }
        )
        .catch(err=>console.log(err))
    })
})
module.exports=router;