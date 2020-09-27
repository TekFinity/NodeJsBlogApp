const post=require('../database/models/Post');
const path=require('path');

module.exports=(req,res)=>{
    const {image} =req.files
    console.log(image.name);
    image.mv(path.resolve(__dirname,'..','public/posts',image.name),(error)=>{

        post.create(
            {...req.body,
             image:`/posts/${image.name}`,
             author:req.session.userId
 
            } ,(error,post)=>{
             res.redirect('/')
         })
    })
   
}