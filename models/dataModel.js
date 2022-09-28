const mongoose = require('mongoose');
const schema = mongoose.Schema({
  title:'String',
  tagline:'String',
  note:'String',
  pinned:{
    type:String,
    default:'false'
  }
},{timestamps:true})


const NotesModel = mongoose.model('Notes', schema);
module.exports = NotesModel;


