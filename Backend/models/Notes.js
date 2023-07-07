const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema({
    user://basically a foreign key which is used to ensure that this notes belong to a particular user
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'

    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        
    },
    tag:{
        type:String,
        default:"General"
    },
    date:{
        type:Date,
        default: Date.now
    }
  });
  module.exports=mongoose.model('notes',NotesSchema);