var mongoose=require('mongoose')
var Schema=mongoose.Schema;

var articleSchema= new Schema({
  title:{type:String, required:true},
  description:{type:String},
  // author:{type:String},
  likes:{type:Number,default:0},
  commentsId:[{type:Schema.Types.ObjectId, ref:"Comment"}],
  authorId:[{type:Schema.Types.ObjectId, ref:"User", required:true}], 

  // slug:{type:String,slug:"title"},

},{timestamps:true});

Article=mongoose.model("Article",articleSchema);

module.exports=Article;
