var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");
var Schema = mongoose.Schema;
var UserSchema = new Schema({
  name:String,
  username:String,
  password:String
});

UserSchema.pre('save',function(next){
  var user = this;
  bcrypt.hash(user.password,null,null,function(err,newPassword){
    if(err) throw err.message;
    user.password = newPassword;
    next();
  });
});

UserSchema.methods.comparePassword = function(password){
  var user = this;
  return bcrypt.compareSync(password,user.password);
};

module.exports = mongoose.model("user",UserSchema);
