var express=require('express');
var router=express.Router();

var Podcast=require('../models/podcast');
var User=require('../models/user');

var auth=require('../middleware/auth');


router.get('/', (req,res,next)=>{
  // console.log(req.user.plan, "plan");
  let userplan=req.user.plan;
  if(userplan==='Free'){
    Podcast.find({podcastplan:userplan},(err,podcasts)=>{
      if(err) return next(err)
     return res.render('adminDashboard',{podcasts:podcasts})
    })
  }

  if(userplan==="VIP"){
    Podcast.find({podcastplan:{$in:["VIP","Free"]}},(err,podcasts)=>{
      if(err) return next(err)

     return res.render('adminDashboard',{podcasts:podcasts})

    })
  }

  if(userplan==="Premium"){
    Podcast.find({},(err, podcasts)=>{
      if (err) return next(err)
      
      res.render('adminDashboard',{podcasts:podcasts})
    })
  }
})

// podcat form
router.get('/new',(req,res,next)=>{
  res.render('addpodcast')
})

// create podcast
router.post('/new',(req,res,next)=>{
  Podcast.create(req.body,(err,podcast)=>{
    if(err) return next(err)
    res.redirect('/podcasts')
  })
})
// find
// router.get('/',(req,res,next)=>{
//   Podcast.find({},(err,podcasts)=>{
//     if(err) return next(err)
//     res.render('adminDashboard',{podcasts:podcasts})
//   })
// })



// delete

router.get('/:id/delete',(req,res,next)=>{
   var id=req.params.id;
   Podcast.findByIdAndDelete(id,(err,deletepost)=>{
      if(err) return next(err)
      res.redirect('/podcasts')
   })
})

// edit
router.get('/:id/edit',(req,res,next)=>{
   var id=req.params.id;
   Podcast.findById(id,(err,podcast)=>{
     if(err) return next(err)
     res.render('editpodcast',{podcast})
   })
})

router.post('/:id/edit',(req,res,next)=>{
   var id=req.params.id;
   Podcast.findByIdAndUpdate(id,req.body,(err,podcast)=>{
     if(err) return next(err)
     res.redirect('/podcasts')
   })
})

module.exports=router;