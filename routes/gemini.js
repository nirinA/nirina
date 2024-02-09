var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    if (req.user) {
	res.render('gemini', { title: 'gemini', user: req.user});
	return
    }
    next();
} , function(req, res, next) {
    res.render('gemini', { title: 'gemini', user: null});
});

module.exports = router;
