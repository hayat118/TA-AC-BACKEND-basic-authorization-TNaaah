var mongoose=require('mongoose')
var bcrypt=require('bcrypt');
var Schema=mongoose.Schema;

var userSchema= new Schema({
  name:{type:String},
  email:{type:String, required:/@/},
  password:{type:String, minlength:4},
  plan:{type:String, default:"Free"},
  isAdmin:{type:Boolean},
},{timestamps:true});


userSchema.pre('save',function(next){
  console.log(this, 'This is the pre');
   let allAdmin=["hayat@gmail.com","kumar@123"];
   if(allAdmin.includes(this.email)){
     this.isAdmin=true;
   }else{
     this.isAdmin=false
   }

  if(this.password && this.isModified('password')){
    bcrypt.hash(this.password, 10 ,(err,hashed)=>{
      if(err) return next(err)
      this.password=hashed;
      return next()
    })
  }else{
    next()
  }
});

userSchema.methods.verifyPassword=function(password,cb){
  bcrypt.compare(password,this.password,(err,result)=>{
    return cb(err,result)
  })
};


var User=mongoose.model("User",userSchema);

module.exports=User;


