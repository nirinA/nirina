var express = require('express');
var router = express.Router();

var db = require('../db');

function callBack(req, res, next) {
    /*db.get('SELECT * FROM users WHERE username = ?', [ req.user.username ],
	   function(err, row) {
	       if (err) { return next(err); }
	       var user =  row;
	       });
	       */
    res.locals.user = req.user;
    
    next();
}

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.user) {
	res.render('index', { title: 'nirinA', user: req.user});
	return
    }
    next();
} , function(req, res, next) {
    res.render('index', { title: 'nirinA', user: null});
});

/*router.get('/', function(req, res, next) {
    if (req.user) {
	var user = req.user;
	console.log('user: '+ user.username); 
    } else {
	var user = {};//db.get('SELECT * FROM users WHERE username = ?', ["dummy"]);
	console.log('no user:');
    }
    console.log('user: '+ user.username + '; '+typeof(user));
    res.render('index', { title: 'nirinA', user: user});
});
*/

router.get('/ni', function(req, res, next) {
    if (req.user.username === "nirinA") {
	res.render('ni', { title: 'nirinA',  user: req.user });
    }
});

module.exports = router;
