var express = require('express');
var router = express.Router();

var Product=require('../models/user');
var User=require('../models/user');

var auth=require('../middleware/auth')

// register
router.get('/register',(req,res,next)=>{
  res.render('registerForm')
})

router.post('/register',(req,res,next)=>{
  User.create(req.body,(err,createdUser)=>{
    if(err) return next(err)
    res.redirect('/users')
  })
})
// users listing
router.get('/',(req,res,next)=>{
  User.find({},(err,users)=>{
    if(err) return next(err)
    res.render('usersList',{users})
  })
})

// user login
router.get('/login', (req, res, next) =>{
    var error=req.flash('error')[0]
    res.render('userLogin',{error})
});

router.post('/login',(req,res,next)=>{
  var{email,password}= req.body;
  if(!email || !password){
    req.flash('error',"email/password is required")
    return res.redirect('/users/login')
  }
  User.findOne({email},(err,user)=>{
    if(err) return next(err)
    // no user
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

      // persist loggedin user
      req.session.userId=user.id;
      res.redirect('/products')
    })

  })

})

// admin login





router.use(auth.loggedInUser);





router.get('/admin', (req, res, next) =>{
    var error=req.flash('error')[0]
    res.render('adminLogin',{error})
});

router.post('/admin',(req,res,next)=>{
  var{email,password}= req.body;
  if(!email || !password){
    req.flash('error',"email/password is required")
    return res.redirect('/users/login')
  }
  User.findOne({email},(err,user)=>{
    if(err) return next(err)
    // no user
    if(!user){
      return res.redirect('/users/admin')
    }
    // compare
    user.verifyPassword(password,(err,result)=>{
      if(err) return next(err)
      if(!result){
        req.flash('error',"incorrect password")
        return res.redirect('/users/admin')
      }

      // persist loggedin user
      req.session.userId=user.id;
      res.redirect('/products/adminpage')


      //   if(user.isAdmin === true) {
      //  return res.redirect('/products/new')
      // }  
      // if(user.isAdmin === false) {
      //   return res.redirect('/products')
      // }


    })

  })

})

// details page for admin







module.exports = router;
