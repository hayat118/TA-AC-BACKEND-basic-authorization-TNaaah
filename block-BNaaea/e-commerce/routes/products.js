var express = require('express');
var router = express.Router();

var Product=require('../models/product');
var User=require('../models/user');


// create product
router.get('/new', (req, res, next) =>{
  res.render('productForm')
  
});



router.post('/new',(req,res,next)=>{
  Product.create(req.body,(err,createproduct)=>{
    if(err) return next(err)
    res.redirect('/products/adminpage')
  })
})

// product list
router.get('/',(req,res,next)=>{
  Product.find({},(err,products)=>{
    if(err) return next(err)
    res.render('productsList',{products})
  })
})
// list for admin

router.get('/adminpage',(req,res,next)=>{
  Product.find({},(err,products)=>{
    if(err) return next(err)
    res.render('adminPage',{products})
  })
})


// details page for user
router.get('/:id',(req,res,next)=>{
  var id=req.params.id;
  Product.findById(id,(err,product)=>{
    if(err) return next(err)
    res.render('productDetails',{product})
  })
})

// details for admin


router.get('/:adminId',(req,res,next)=>{
  var adminId=req.params.adminId;
  Product.findById({adminId},(err,products)=>{
    if(err) return next(err)
    res.render('adminPage',{products})
  })
})

// edit
router.get('/:id/edit',(req,res,next)=>{
  var id=req.params.id;
  Product.findById(id,(err,product)=>{
    if(err) return next(err)
    res.render('editForm',{product})
  })
})
router.post('/:id',(req,res,next)=>{
  var id=req.params.id;
  Product.findByIdAndUpdate(id,req.body,(err,updateProduct)=>{
    if(err) return next(err)
    res.redirect('/products/adminpage')
  })
})

// delete
router.get('/:id/delete',(req,res,next)=>{
  var id=req.params.id;
  Product.findByIdAndDelete(id,(err,product)=>{
    if(err) return next(err)
    res.redirect('/products/adminpage')
  })
})



// likes
router.get('/:id/likes',(req,res,next)=>{
  var id=req.params.id;
  Product.findByIdAndUpdate(id,{$inc: {likes:1}},(err,product)=>{
    if(err) return next(err)
    res.redirect('/products/' + id)
  })
})

// cart
router.get('/:id/cart',(req,res,next)=>{
  var id=req.params.id;
  Product.findByIdAndUpdate(id,{$inc: {cart:1}},(err,product)=>{
    if(err) return next(err)
    res.redirect('/products/' + id)
  })
})




module.exports = router;