const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Message', new Schema({
    senderLogin: String,
    recipientLogin: String,
    date: Date,
    message: String
}));

