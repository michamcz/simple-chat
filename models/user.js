const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    time: Date,
    login: String,
    password: String,
    friends: [String]
}));