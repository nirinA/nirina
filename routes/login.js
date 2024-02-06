var express = require('express');
var router = express.Router();
var path = require('path');
var urlencodedParser = express.urlencoded({ extended: true })

var passport = require('passport');
var LocalStrategy = require('passport-local');
var bcrypt = require('bcrypt');

var db = require('../db');

passport.use(new LocalStrategy(function verify(username, password, cb) {
  db.get('SELECT * FROM users WHERE username = ?', [ username ], function(err, row) {
    if (err) { return cb(err); }
    if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }
    
    bcrypt.compare(password, row.hashed_password, function(err, result) {
      if (err) { return cb(err); }
      if (!result) {
        return cb(null, false, { message: 'Incorrect username or password.' });
      }
      return cb(null, row);
    });
  });
}));

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

//show the login form
router.get('/login', function(req, res, next) {
    res.render('login', {title: 'login',
			 message: [] // 'loginMessage: ther is error'
			});
});

router.post('/login/password', passport.authenticate('local', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/login',
  failureMessage: true
}));

router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});
//------------------------------//
// we will want this protected so you have to be logged in to visit
// we will use route middleware to verify this (the isLoggedIn function)
router.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
	user : req.user // get the user out of session and pass to template
	});
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
	console.log('user logged'+req.user);
	return next();
    // if they aren't redirect them to the home page
        res.redirect('/login');
}
//-------------------------------//

module.exports = router;

/*
//show the login form
router.get('/login', function(req, res, next) {
    res.render('login', {title: 'login',
			// message: req.flash('loginMessage') });
});

router.get('/logout' , function(req, res, next) {
    res.redirect('/')
});

router.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
//	user : req.user // get the user out of session and pass to template
	});
});

router.post('/process', passport.authenticate('local', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/', //redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
	console.log('user logged');
	return next();
    }
    // if they aren't redirect them to the login page
        res.redirect('/login');
}
*/
