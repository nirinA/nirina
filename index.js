const express = require('express')
const bodyParser = require('body-parser')
const createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var path = require('path');
const rfs = require("rotating-file-stream");

var app = express()
const port = process.env.PORT || 3000
app.enable("trust proxy");
const accessLogStream = rfs.createStream("file.log", {
  size: "1M", // rotate every 1 MegaBytes written
  interval: "1d", // rotate daily
  compress: "gzip", // compress rotated files
  path: path.join(__dirname, 'log')
});

app.use(bodyParser.urlencoded({ extended: true }))

var indexRouter = require('./routes/index');
var newspageRouter = require('./routes/newspage');
var wikiRouter = require('./routes/wiki');
//var put_wikiRouter = require('./routes/put_wiki');

/*
var usersRouter = require('./routes/users');
var artisansRouter = require('./routes/artisans');
*/
var loginRouter = require('./routes/login'); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use(logger("combined", { stream: accessLogStream }));

app.use('/', indexRouter);
app.use('/newspage', newspageRouter);
app.use('/wiki', wikiRouter);

/*
app.use('/users', usersRouter);

app.use('/artisans', artisansRouter);
*/
app.use('/login', loginRouter);

//app.use('/put_wiki', put_wikiRouter);

app.get('/about', (req, res) => {
    res.type('text/plain')
    res.send('About Page')

})

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
//app.listen(3000, '0.0.0.0');
/*
app.listen(port, () => console.log(
   `Express started on http://localhost:${port}; ` +
`press Ctrl-C to terminate.`))
*/
