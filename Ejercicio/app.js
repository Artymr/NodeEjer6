var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session'); //nuevo

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//para el chat
var chatRouter = require('./routes/chat');


//LO NUEVO DEL LOGIN VVVVVVVVV
var loginRouter = require('./routes/login');
var restringidaRouter = require('./routes/restringida');

var app = express();//nuevo

app.use(session({  //nuevo
  secret: 'claveParaCookies',
  resave: false,
  saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//LO NUEVO DEL LOGIN VVVVVVVVV
app.use('/login', loginRouter);
app.use('/restringida', restringidaRouter);
app.use('/chat', chatRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//nuevo del socket.io VVVVVVVV
let mensajes = [];
app.locals.mensajes = mensajes;

const io = app.get('io');

if (io) {
  io.on('connection', (socket) => {
    const usuario = socket.handshake.auth.usuario || 'Anonimo';

    socket.emit('mensajes', mensajes);

    socket.on('mensajeNuevo', (msg) => {
      const mensaje = {
        usuario: usuario,
        mensaje: msg,
        fecha: new Date().toLocaleTimeString()
      };
      mensajes.push(mensaje);
      if (mensajes.length > 10) {
        mensajes.shift();
      }
      io.emit('mensajeNuevo', mensaje);
    });
  });
}
//nuevo del socket.io ^^^^^^^^^__
module.exports = app;
