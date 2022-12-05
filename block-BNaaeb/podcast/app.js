var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session=require('express-session');
var MongoStrore=require('connect-mongo');
var flash=require('connect-flash');
var dotenv=require('dotenv')


require('dotenv').config();


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { default: mongoose } = require('mongoose');
var auth=require('./middleware/auth');
var podcastsRouter=require('./routes/podcasts')





mongoose.connect("mongodb://localhost:27017/podcast",(err)=>{
  console.log(err ? err:"connected true")
})

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// add session
app.use(session({
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:false,
  strore:MongoStrore.create({mongoUrl:"mongodb://localhost:27017/podcast"})
}))

app.use(flash());
app.use(auth.userInfo);

// 

app.use('/', indexRouter);
app.use(auth.userInfo);
app.use('/users', usersRouter);
app.use('/podcasts', auth.loggedInUser, podcastsRouter);



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
