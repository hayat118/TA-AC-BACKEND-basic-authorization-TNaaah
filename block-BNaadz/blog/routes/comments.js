var express=require('express')
var router=express.Router();

var Article=require('../models/article');
var User=require('../models/user');
var Comment=require('../models/comments');

// edit

// router.get('/:id/edit',(req,res,next)=>{
//    var id=req.params.id;
//    Comment.findById(id,(err,comment)=>{
//      if(err) return next(err);
//      res.render('updateComment',{comment:comment})
//    })
// })
// router.post('/:id',(req,res)=>{
//   var id=req.params.id;
//   Comment.findByIdAndUpdate(id,req.body,(err,updatedComment)=>{
//     if(err) return next(err)
//     res.redirect('/books/' + updatedComment.bookId)
//   })
// })

// delete
router.get('/:id/delete',(req,res,next)=>{
  var commentsId=req.params.id;
  Comment.findByIdAndDelete(commentsId,(err,comments)=>{
    if(err) return next(err);
    Article.findByIdAndUpdate(comments.articleId,{$pull:{comments:comments._id}},(err,article)=>{
    res.redirect('/articles/' + comments.articleId)
       
    })
  })
})








module.exports=router;