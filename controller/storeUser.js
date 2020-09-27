const User=require('../database/models/user')

module.exports=(req,res)=>{
    User.create(req.body,(error,user)=>{
        if(error){
            const registraionsErrors= Object.keys(error.errors).map(key=>error.errors[key].message)
            req.flash('registrationError',registraionsErrors)
            req.flash('data',req.body)
           return res.redirect('/auth/register')
        }
        res.redirect('/')
    })
}