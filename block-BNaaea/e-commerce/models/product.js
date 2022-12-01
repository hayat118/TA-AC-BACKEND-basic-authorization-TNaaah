var mongoose=require('mongoose')
var Schema=mongoose.Schema;

var productSchema= new Schema({
  productName:{type:String,required:true},
  quantity:{type:Number},
  price:{type:Number},
  likes:{type:Number, default:0},
  cart:{type:Number,default:0},
},{timestamps:true})

var Product=mongoose.model('Product',productSchema);
module.exports=Product;