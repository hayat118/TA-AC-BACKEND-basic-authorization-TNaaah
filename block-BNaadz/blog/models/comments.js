var mongoose=require('mongoose')
var Schema=mongoose.Schema;

// var slug=require('mongoose-slug-generator')
// mongoose.plugin(slug)

var commentSchema= new Schema({
  title:{type:String},
  author:{type:String},
  likes:{type:Number, default:0},
  articleId:[{type:Schema.Types.ObjectId,ref:"Article"}],
  slug:{type:String, slug:"title"},
  articleSlug:{type:String}
},{timestamps:true})

var Comment = mongoose.model('Comment', commentSchema);

module.exports=Comment;