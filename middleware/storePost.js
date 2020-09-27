module.exports=(req,res,next)=>{
    
    if(req.files==null||!req.body.title||!req.body.description){
        return res.redirect('/post/new')
    }
    next()
}