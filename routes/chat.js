const Message = require('../models/message');

exports.saveMessages = function (req, res, next) {
    const message = new Message({ 'senderLogin': req.params.owner, 'recipientLogin': req.params.user, 'date': new Date, 'message': req.body.wiadomosc });
    message.save().then(() => {
        res.redirect(req.params.user) 
    });
}

exports.displayMessages = function (req, res, next) {

    let conversation = [];
    Message.find({ 'senderLogin': req.params.owner, 'recipientLogin': req.params.user }, 'message date', (err, messages) => {
        if (req.params.owner != req.params.user) {
            messages.forEach((one) => {
                conversation.push({
                    author: req.params.owner,
                    message: one.message,
                    date: one.date
                });
            });
        }
        Message.find({ 'senderLogin': req.params.user, 'recipientLogin': req.params.owner }, 'message date', (err, messages) => {
            messages.forEach((one) => {
                conversation.push({
                    author: req.params.user,
                    message: one.message,
                    date: one.date
                });
            });
            conversation.sort((a, b) => {
                var c = a.date;
                var d = b.date;
                return c - d;
            });
            if (conversation.length === 0) conversation = [{
                author: '',
                message: ' start a conversation ',
                date: new Date
            }];
            res.render('chat', { final: conversation, owner: req.params.owner, recipient: req.params.user });
        });
    });
}