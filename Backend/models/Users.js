const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default: Date.now
    }
  });
  const User=mongoose.model('user',UserSchema);
  User.createIndexes();//to prevent multiple copies of the unique field to get entered in the database
  module.exports=User;