var User = require('../models/user')
var Podcast=require('../models/podcast');


module.exports={
    loggedInUser:(req,res,next)=>{
        if(req.session && req.session.userId){
            next()
        }else{
            res.redirect('/users/login')
        }


    },
    userInfo:(req,res,next)=>{
        var userId = req.session && req.session.userId;
        if(userId){
            User.findById(userId,'name email isAdmin plan',(err,user)=>{
                if(err) return next(err);
                req.user = user;
                res.locals.user = user;
                next();
            })
        }else{
            req.user = null;
            res.locals.user = null;
            next();
        }
    },

    isAdmin:(req,res,next)=>{
        var isAdmin=req.user.isAdmin;
        console.log(isAdmin);
        if(isAdmin===true){
            next();
        }else{
            res.redirect('/podcasts')
        }
    },
   
}