const express = require('express')
const router = express.Router();
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken')

require('../db/conn')
const User = require('../models/userSchema');
const userAuth = require('../Middleware/userAuth');


router.post('/register',async(req,res)=>{
    try {
        let userExists = await User.findOne({email:req.body.email})
        if(userExists){
           return  res.send({
            success:false,
            message:'user already exists'})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(req.body.password,salt)
        req.body.password=hashedPass
        const user = new User(req.body)
        await user.save()
        res.send({
            message:'user created successfully',
            data:null,
            success:true
        })
    } catch (error) {
        res.send({message:error.message,success:false})
    }
})

router.post('/login',async(req,res)=>{
    try {
        let user = await User.findOne({email:req.body.email})
    if(!user){
        res.send({success:false,message:'user not exists'})
    }
    const validpassword =await bcrypt.compare(req.body.password,user.password)
    if(!validpassword){
        res.send({success:false,message:'invalid password'})
    }
    if(!user.isverified){
        res.send({success:false,message:'user not verified'})
    }
    const token = jwt.sign({userID:user._id},process.env.SECRET_KEY,{expiresIn:'1d'})

    res.send({
        message:'login successfully',
        data:token,
        success:true
    })
    } catch (error) {
        res.send({
            message:error.message,
            success:false
        })
    }
    
})


router.post('/get-user-info-by-id',userAuth,async(req,res)=>{
    try {
        const user = await User.findById(req.body.userID)
        user.password = ''
        res.send({
            message:'userinfo successfully',
            success:true,
            data:user
        })
    } catch (error) {
        res.send({
            message:error.message,
            success:false
        })
    }
})

//get all users
router.post('/get-all-users',userAuth,async(req,res)=>{
    try {
        const users = await User.find()
        res.send({
            message:'users successfully',
            success:true,
            data:users
        })
    } catch (error) {
        res.send({
            message:error.message,
            success:false
        })
    }
})

//update user verified status
router.post("/update-verified-user", userAuth, async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.body.selectedUser, {
        isverified: req.body.isverified,
      });
      res.send({
        data: null,
        message: "user updated successfully",
        success: true,
        isverified:true
      });
    } catch (error) {
      res.send({ data: error, message: error.message, success: false });
    }
  });


module.exports=router