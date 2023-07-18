const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    balance:{
        type:Number,
        default:0
    },
    identificationtype:{
        type:String,
        required:true
    },
    identificationnumber:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    isverified:{
        type:Boolean,
        default:false
    },
    isadmin:{
        type:Boolean,
        default:false
    },
},
{
    timestamps:true
})


const User = mongoose.model('USER',userSchema)

module.exports=User