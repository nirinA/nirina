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
    if (!req.user) {
	res.render('index', { title: 'nirinA'});
	return
    }
    next();
}, function(req, res, next) {
    //res.locals.filter = null;
    res.render('index_l', { title: 'nirinA',  user: req.user });
});

router.get('/ni', function(req, res, next) {
    if (req.user.username === "nirinA") {
	res.render('ni', { title: 'nirinA',  user: req.user });
    }
});

module.exports = router;
