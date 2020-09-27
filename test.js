const mongoose=require('mongoose')
const Post = require('./database/models/Post')

mongoose.connect('mongodb://localhost/node-js-test')

Post.findByIdAndUpdate('5e9350f6d8da651b58690feb',{
    title:'My First Blog'
},(err,post)=>{
    console.log(err,post)
})

// Post.find({

// },(error,post)=>{
//     console.log(error,post)
// })
// Post.create({
//     title: 'My first Blog',
//     description:' My Description',
//     content: 'My content'
// },(error,post)=>{
//     console.log(error,post)
// })