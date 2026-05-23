const mongoose=require('mongoose')

const Schema=mongoose.Schema

const idea=new Schema({
  idea:String,
  user:String,
  date:{
    type:Date,
    default:Date.now()
  }
})

const ideaModel=mongoose.model('ideaModel',idea);

module.exports=ideaModel