//zrobić:
//socket.io
//konta

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const path = require('path');
const pug = require('pug');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('./config');

const app = express();
const server = require('http').Server(app);

const io = require('socket.io')(server);

mongoose.connect(config.database);
app.set('superSecret', config.secret)
app.set('view engine', 'pug');

const User = require('./models/user')

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', routes.main);
app.get('/registration', routes.login.registration);
app.post('/registration', routes.login.regsubmit)
app.get('/login', routes.login.login);
app.post('/login', routes.login.logsubmit);
app.get('/:owner/list', routes.auth.auth, routes.list.showList);
app.get('/:owner/chat/:user', routes.auth.auth, routes.chat.displayMessages);
app.post('/:owner/chat/:user', routes.auth.auth, routes.chat.saveMessages);
app.get('/:owner/add/:user', routes.auth.auth, routes.list.addFriend);
app.get('/:owner/logout', routes.auth.auth, routes.login.logout);
app.get('/:owner/profile', routes.auth.auth, routes.profile.showProfile);
app.post('/:owner/profile', routes.auth.auth, routes.profile.changePassword);


io.sockets.on('connection', function (socket) {
  console.log("Socket connected.");
  socket.on('reload', function () {
    io.emit('reload');
  });
});


server.listen(8000, () => {
  console.log("Chat Server");
});
