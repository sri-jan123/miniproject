const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const project = new Schema({
  user: String, 
  date: {
    type: Date,
    default: Date.now(),
  },
  images: [
    {
      url: String, 
      caption: String, 
    },
  ],
});

const projectModel = mongoose.model("projectModel", project);

module.exports=projectModel;