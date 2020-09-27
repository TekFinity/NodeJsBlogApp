module.exports=(req,res)=>{
    console.log(req.flash('data')[0])
    res.render('register',{
        errors:req.flash('registrationError'),
        dataa:req.flash('data')[0]
    })
}