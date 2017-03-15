var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');

// Import base routes
const routes = require('./routes/index');
const usersRoutes = require('./routes/users');
const host = 'localhost';
const dbName = 'michelespinello'//'SJ-lesson3';
const mongoose = require('mongoose');

mongoose.connect('mongodb://'+ host + '/' + dbName)

var db = mongoose.connection
db.on('error', function ()
{
    console.error('Connection error!');

});
db.once('open',function () {
    console.log('DB connection Ready');

})
// Init express app
var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.set('view engine', 'html');

// Setup logger and body parser
app.use(logger('dev'));
app.use(bodyParser.json());

// Setup static public folder
app.use(express.static(path.join(__dirname, 'public')));


// Setup base routes
app.use('/', routes);
app.use('/users',usersRoutes);//
// Catch 404 errors
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
