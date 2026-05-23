const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const signup = new Schema({
    username: String,
    email: String,
    password: String,
    profilepic: String,
    projects: Array,
    ideas: Array
});

const signupModel = mongoose.model('signupModel', signup);

module.exports = signupModel;