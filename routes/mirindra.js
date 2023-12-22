var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    if (req.user) {
	res.render('mirindra', { title: 'nirinA', user: req.user});
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

router.get('/05', function(req, res, next) {
    if (req.user.username === "mirindra") {
	res.render('mirindra_05', { title: 'mirindra',  user: req.user });
	return
    }
    next();
} , function(req, res, next) {
    res.render('index', { title: 'nirinA', user: null});
});

module.exports = router;
