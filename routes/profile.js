const User = require('../models/user');

exports.showProfile = (req,res,next) => {
    User.findOne({ login: req.params.owner }, (err, user) => {
        if (err) throw err;
        if (user) {
            res.render('profile', {owner: req.params.owner, time: user.time});
        }
    });
}

exports.changePassword = (req,res,next) => {
    User.findOne({login: req.params.owner}, (err,user) => {
        if (user.password != req.body.current) {
            res.render('profile', { message: 'Incorrect password' });
        }
        else if (req.body.password !== req.body.repeat) {
            res.render('profile', { message: 'Passwords are not the same' });
        }
        else {
            User.update(
                { password: req.body.password },
                (err, raw) => {
                    if (err) throw err;
                    else
                        res.redirect('/' + req.params.owner + '/profile');
                }
            );
        }
    });
}