var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");
var Schema = mongoose.Schema;
var LoginSchema = new Schema({
  username:String,
  password:String
});

module.exports = mongoose.model("login",LoginSchema);
