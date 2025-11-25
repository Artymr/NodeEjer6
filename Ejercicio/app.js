var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var restringidaRouter = require('./routes/restringida');
var chatRouter = require('./routes/chat');

var app = express();

var session = require("express-session");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// MIDDLEWARES
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// SESIÓN
const sessionMiddleware = session({
    secret: "claveParaCookies",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 }
});
app.use(sessionMiddleware);
app.set("sessionMiddleware", sessionMiddleware);

// ESTÁTICOS
app.use(express.static(path.join(__dirname, 'public')));

// RUTAS NORMALES
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);

// RUTAS PROTEGIDAS
app.use('/restringida', restringidaRouter);
app.use('/chat', chatRouter);

// 404
app.use(function(req, res, next) {
  next(createError(404));
});

// HANDLER ERRORES
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
