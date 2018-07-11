const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    var owner = req.params.owner;
    var token = req.cookies[owner];

    if (token) {
        jwt.verify(token, req.app.get('superSecret'), (err, decoded) => {
            if (err) {
                res.render('error')
            }
            else {
                req.decoded = decoded;
                next();
            }
        });
    }
    else {
        res.render('login', { message: 'najpierw się zaloguj' });
    }
}