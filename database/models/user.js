const mongoose= require('mongoose')
const bcrypt=require('bcrypt')
const user= new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Please provide Username'],
        
    },
    email:{
        type:String,
        required:[true,'Please provide Email'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Please provide Password'],
    }
})
user.pre('save',function(next){
    const User=this
    bcrypt.hash(User.password,10,function(error,encrypted){
        User.password=encrypted

        next()
    })
})
module.exports =mongoose.model('User',user)