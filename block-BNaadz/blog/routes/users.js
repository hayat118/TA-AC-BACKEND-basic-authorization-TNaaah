var express = require('express');
var User = require('../models/user');
var router = express.Router();


// register users
router.get('/register', (req, res, next)=> {
  // res.send('respond with a resource');
  res.render('form')
});
/* GET users listing. */
router.get('/',(req,res,next)=>{
  console.log(req.session)
   User.find({},(err,users)=>{
     if(err) return next(err)
     res.render('userList',{users})
   })
})

// create user
router.post('/register',(req,res,next)=>{
  User.create(req.body,(err,createdUser)=>{
    if(err) return next(err)
    res.redirect('/users/login')
  })
})


// log out
router.get('/logout',(req,res)=>{
  req.session.destroy();
  res.clearCookie('connect-sid');
  res.redirect('/users/login')
})


// login
router.get('/login',(req,res,next)=>{
  var error=req.flash('error')[0];
  res.render('login',{error})
})

router.post('/login',(req,res,next)=>{
  var{email,password}=req.body;
  if(!email || !password){
    req.flash('error',"email/password is required");
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
      req.flash('error',"incorrect password");
       return res.redirect('/users/login')
    }
    // persist logged in user info
    req.session.userId=user.id;
    res.redirect('/')
  })

})
})

//details page
router.get('/:id',(req,res,next)=>{
  var id=req.params.id;
  User.findById(id,(err,user)=>{
    if(err) return next(err)
    res.render('singleUser',{user})
  })
})

// edit
router.get('/:id/edit',(req,res,next)=>{
  var id=req.params.id;
  User.findById(id,(err,user)=>{
    if(err) return next(err)
    res.render('editUser',{user})
  })
})

router.post('/:id',(req,res,next)=>{
  var id=req.params.id;
  User.findByIdAndUpdate(id,req.body, (err,updateUser)=>{
    if(err) return next(err)
    res.redirect('/users/' + id)
  })
})
// delete
router.get('/:id/delete',(req,res,next)=>{
  var id=req.params.id;
  User.findByIdAndDelete(id,(err,user)=>{
    if(err) return next(err)
    res.redirect('/users')
  })
})






module.exports = router;
