var express = require('express');
var router = express.Router();

var User=require('../models/user');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// users form
router.get('/register',(req,res,next)=>{
  res.render('register')
})

// create user
router.post('/register',(req,res,next)=>{
  User.create(req.body,(err,createUser)=>{
    if(err) return next(err)
    res.redirect('/users')
  })
})

// find user

router.get('/',(req,res,next)=>{
  User.find({},(err,users)=>{
    if(err) return next(err)
    res.render('usersList',{users})
  })
})

// user login

router.get('/login',(req,res,next)=>{
  var error=req.flash('error')[0]
  res.render('login',{error})
})

router.post('/login',(req,res,next)=>{
  var{email , password}=req.body;
  if(!email || !password){
    req.flash('error',"email/password required");
     return res.redirect('/users/login')
  }

 User.findOne({email},(err,user)=>{
   if(err) return next(err)
  //  no user
  if(!user){
    return res.redirect('/users/login')
  }
  // compare
  user.verifyPassword(password,(err,result)=>{
    if(err) return next(err)
    if(!result){
      req.flash('error',"incorrect password")
      return res.redirect('/users/login')
    }
    // persist loggen in user
    req.session.userId=user.id;
    if(user.isAdmin===true){
       return res.redirect('/podcasts')
    }
    if(user.isAdmin===false){
       return res.redirect('/podcasts')
    }else{
      return res.redirect('/podcasts')
    }

   
  })
 })

})

// log out
router.get('/logout',(req,res)=>{
  req.session.destroy();
  res.clearCookie('connect-sid');
  res.redirect('/')
})


module.exports = router;
