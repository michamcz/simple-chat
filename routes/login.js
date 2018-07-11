const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config')

exports.logout = function (req, res, next) {
    res.clearCookie(req.params.owner);
    res.redirect('/login');
}

exports.login = function (req, res, next) {
    res.render('login');
}

exports.registration = function (req, res, next) {
    res.render('registration');
}

exports.regsubmit = function (req, res, next) {
    const account = new User({ login: req.body.login, password: req.body.password, friendsList: [] , time: new Date});
    User.findOne({ login: req.body.login }, (err, user) => {
        if (err) throw err;
        if (user) {
            res.render('registration', { message: 'login ' + user.login + ' jest zajety!!' });
        }
        else if (req.body.password !== req.body.repeat) {
            res.render('registration', { message: 'Passwords are not the same' });
        }
        else if (!user) {
            account.save((err) => {
                if (err) throw err;
                res.redirect('/login');
            });
        }

    });
};

exports.logsubmit = function (req, res, next) {
    User.findOne({ login: req.body.login, password: req.body.password }, (err, user) => {
        if (err) throw err;
        if (!user) {
            res.render('login', { message: 'Incorrect password or login' });
        }
        else if (user) {
            var token = jwt.sign(user.toJSON(), req.app.get('superSecret'), {
                expiresIn: '60m'
            });
            res.cookie(user.login, token);
            res.redirect(user.login + '/list');
        }
    });
};


