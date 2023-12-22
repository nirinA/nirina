var express = require('express');
var router = express.Router();

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

router.get('/ni', function(req, res, next) {
    if (req.user.username === "nirinA") {
	res.render('ni', { title: 'nirinA',  user: req.user });
	return
    }
    next();
} , function(req, res, next) {
    res.render('index', { title: 'nirinA', user: null});
});

/*
router.get('/mirindra', function(req, res, next) {
    if (req.user.username === "mirindra") {
	res.render('mirindra', { title: 'mirindra',  user: req.user });
	return
    }
    next();
} , function(req, res, next) {
    res.render('index', { title: 'nirinA', user: null});
});
*/

module.exports = router;
