var express = require('express')
const bodyParser = require('body-parser')
const createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var path = require('path');
var rfs = require("rotating-file-stream");

var session = require('express-session');
var csrf = require('csurf');
var passport = require('passport');

var SQLiteStore = require('connect-sqlite3')(session);

var app = express()
const port = process.env.PORT || 3000
//app.enable("trust proxy");
const accessLogStream = rfs.createStream("file.log", {
  size: "1M", // rotate every 1 MegaBytes written
  interval: "1d", // rotate daily
  compress: "gzip", // compress rotated files
  path: path.join(__dirname, 'log')
});

app.use(bodyParser.urlencoded({ extended: false }))

var indexRouter = require('./routes/index');
var newspageRouter = require('./routes/newspage');
var wikiRouter = require('./routes/wiki');
//var put_wikiRouter = require('./routes/put_wiki');

/*
var usersRouter = require('./routes/users');
var artisansRouter = require('./routes/artisans');
*/
var loginRouter = require('./routes/login'); 
var mirindraRouter = require('./routes/mirindra');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.locals.pluralize = require('pluralize');

app.use(logger("combined", { stream: accessLogStream }));

//require('./config/passport')(passport); // pass passport for configuration
//app.use(pass);

// passport session
//app.set('trust proxy', 1) // trust first proxy
app.use(session({ secret: 'ilovescotchscotchyscotchscotch',  // session secret
		  resave: false,
		  saveUninitialized: false, //true,
		  store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
		}));

app.use(csrf());
app.use(passport.authenticate('session'));

app.use(function(req, res, next) {
  var msgs = req.session.messages || [];
  res.locals.messages = msgs;
  res.locals.hasMessages = !! msgs.length;
  req.session.messages = [];
  next();
});


app.use(function(req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  next();
});


/*
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
*/

//require('./routes/login.js')(app, passport);

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
	console.log('user logged'+req.user.username);
	return next();
    }
    // if they aren't redirect them to the home page
    res.redirect('/login');
}

app.use( '/images/mirindra', isLoggedIn, express.static( path.join( __dirname, '/public/images/mirindra' ) ) );
app.use(express.static(__dirname + '/public'));

app.use('/', indexRouter);
app.use('/newspage', newspageRouter);
app.use('/wiki', wikiRouter);
app.use('/mirindra', mirindraRouter);
/*
app.use('/users', usersRouter);

app.use('/artisans', artisansRouter);
*/
app.use('/', loginRouter);

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
