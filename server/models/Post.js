var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var PostSchema=new Schema({
  postmsg:{
    type:String,
    required:true
  },
  userid:{
    type:String,

  },
  name:{
    type:String,
  },
  createdAt:{
    type:Date,
    default:Date.now
  },
  upvote:{
    type:Number,
    default:0
  }
});
module.exports = mongoose.model('Post', PostSchema);
