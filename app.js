const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const layouts      = require('express-ejs-layouts');
const mongoose     = require('mongoose');
const session      = require('express-session');
const passport     = require('passport');

//Importing the "dotenv" package and load variables from the ".env" file.
// must be in the top, before we try to use the variables.
require('dotenv').config();

require('./config/passport-config.js');

mongoose.connect(process.env.MONGODB_URI);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// default value for title local
app.locals.title = 'citizenship test';

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(layouts);

app.use(session({
  secret: 'zlkdjffds', // do a random order of letters, doesn’t matter as long as its different on each app.
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//THIS MIDDLEWARE CREATES the "currentUser" for ALL VIEWS
app.use((req, res, next) => {
//if user is NOT logged in, req.user will be empty.
// Check if the user IS logged in
if(req.user){ //req.user is defined by passport middleware
  res.locals.currentUser = req.user;
}
  next(); // If you don't do next(); your pages will load forever
});

//ROUTES ------------------------------------------------------
const index = require('./routes/index');
app.use('/', index);

const myQuestionsRoutes = require('./routes/questions-router.js');
app.use('/', myQuestionsRoutes);

const myAuthRoutes = require('./routes/auth-router.js');
app.use('/', myAuthRoutes);

//END ROUTES ------------------------------------------------------
// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
