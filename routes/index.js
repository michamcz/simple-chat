exports.login = require('./login');
exports.list = require('./list');
exports.chat = require('./chat');
exports.auth = require('./auth');
exports.profile = require('./profile');

exports.main = function (req, res, next) {
    res.render('main');
}
