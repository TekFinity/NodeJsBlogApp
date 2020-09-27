const mongoose= require('mongoose')

const PostSchema= mongoose.Schema({
    title:String,
    description:String,
    content:String,
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    image:String,
    createdBy:{
        type:Date,
        default: new Date()
    }
})

const Post= mongoose.model('Post',PostSchema)

module.exports=Post