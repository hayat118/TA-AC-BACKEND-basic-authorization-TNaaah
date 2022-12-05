var mongoose=require('mongoose')
var bcrypt=require('bcrypt');

var Schema=mongoose.Schema;

var podcastSchema= new Schema({
  title:{type:String},
  artist:{type:String},
  song:{type:String},
  podcastplan:{type:String},
  userId:{type:Schema.Types.ObjectId, ref:"User"}
},{timestamps:true});

var Podcast=mongoose.model("Podcast",podcastSchema);
module.exports=Podcast;