const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(helmet({
  dnsPrefetchControl: { allow: 'true' }
}));

//Connect to MongoDB
mongoose.Promise = Promise;
mongoose
    .connect('mongodb+srv://mernuser:' + encodeURIComponent(process.env.MONGO_ATLAS_PW) + '@assignmentcluster-x3laa.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })
    .then(() => console.log('Mongo DB Connected'))
    .catch(err => console.log(err));

//Morgan logger
if(app.get('env') === 'development') {
  app.use(morgan('dev')); //logging only in development phase
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//To prevent CORS errors. this should be before routes
app.use((req,res,next) => {
  res.header("Access-Control-Allow-Origin","*");// * gives  access to any origin
  res.header(
      "Access-Control-Allow-Headers",
      "Origin,X-Requested-With, Content-Type, Accept, Authorization"
  );
  if(req.method === 'OPTIONS') { //we check req.method(which gives access to the http method used:get,post etc) to OPTIONS. browser always sends options request along with post or put.
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();// this is included if we dont immediately return the output from the above if statement, so that other routes can take over
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('/',(req,res) =>res.send('APii'));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
