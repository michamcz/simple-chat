const User = require('../models/user');

exports.showList = (req, res, next) => {
    User.find({}, (err, users) => {
        User.findOne({ login: req.params.owner }, (err, owner) => {
            res.render('list', { usersList: users, owner: req.params.owner, friendsList: owner.friends });
        })
    });
}

exports.addFriend = (req, res, next) => {
    User.update(
        { login: req.params.owner },
        { $push: { friends: req.params.user } },
        (err, raw) => {
            if (err) throw err;
            else
                res.redirect('/' + req.params.owner + '/list');
        }
    );
}