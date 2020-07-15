const createError = require('http-errors');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

// ROUTES FROM ROUTES FOLDERS
const indexRouter = require('./routes/index');
const playerRouter = require('./routes/playerRoutes');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// MIDDLEWARES
app.use(cors({
  // origin: process.env.URL,
  'Access-Control-Allow-Origin': process.env.URL
}));

// middleware to send see at what time the request as been made
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  next();
});

// ROUTES
app.use('/', indexRouter);
app.use('/players', playerRouter);

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

module.exports = app;
