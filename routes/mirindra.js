var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
let imagesDir = path.join(__dirname, '..', 'public', 'images', 'mirindra');
let listDir = fs.readdirSync(imagesDir);
let listImages = listDir.filter(i => i.endsWith('.png'));
let listVideos = listDir.filter(i => i.endsWith('.webm'));

let imagesDir1 = path.join(__dirname, '..', 'public', 'images', 'mirindra', '20090813');
let listDir1 = fs.readdirSync(imagesDir1);
let listImages1 = listDir1.filter(i => i.endsWith('.png'));
let listVideos1 = listDir1.filter(i => i.endsWith('.webm'));

let imagesDir2 = path.join(__dirname, '..', 'public', 'images', 'mirindra', '20090928');
let listDir2 = fs.readdirSync(imagesDir2);
let listImages2 = listDir2.filter(i => i.endsWith('.png'));
let listVideos2 = listDir2.filter(i => i.endsWith('.webm'));

//console.log(listVideos);

router.get('/', function(req, res, next) {
    if (req.user) {
	res.render('mirindra', { title: 'nirinA', user: req.user});
	return
    }
    next();
} , function(req, res, next) {
    res.render('index', { title: 'nirinA', user: null});
});

router.get('/video0', function(req, res, next) {
    if (req.user.username === "mirindra") {
	res.render('mirindra_video0', { title: 'mirindra',
					listVideos: listVideos,
					user: req.user });
	return
    }
    next();
} , function(req, res, next) {
    res.render('index', { title: 'nirinA', user: null});
});

router.get('/05', function(req, res, next) {
    if (req.user.username === "mirindra") {
	res.render('mirindra_05', { title: 'mirindra',
				    listImages: listImages,
				    user: req.user });
	return
    }
    next();
} , function(req, res, next) {
    res.render('index', { title: 'nirinA', user: null});
});

router.get('/video1', function(req, res, next) {
    if (req.user.username === "mirindra") {
	res.render('mirindra_video1', { title: 'mirindra',
					listImages: listImages1,
					listVideos: listVideos1,
					user: req.user });
	return
    }
    next();
} , function(req, res, next) {
    res.render('index', { title: 'nirinA', user: null});
});

router.get('/video2', function(req, res, next) {
    if (req.user.username === "mirindra") {
	res.render('mirindra_video2', { title: 'mirindra',
					listImages: listImages2,
					listVideos: listVideos2,
					user: req.user });
	return
    }
    next();
} , function(req, res, next) {
    res.render('index', { title: 'nirinA', user: null});
});

module.exports = router;
