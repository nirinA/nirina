var express = require("express");
var router = express.Router();

var path = require("path");

var Parser = require("rss-parser");
var parser = new Parser({
  headers: {
      Accept: 'application/rss+xml, application/xml, application/atom+xml',
  },
});
//const json2html = require("node-json2html");
const { parse } = require('rss-to-json');

const util = require("util");
const fs = require('fs');
const pfs = { readFile: util.promisify(fs.readFile)};

let arXiv = ["astro-ph","cond-mat","cs","eess","gr-qc","hep-ex",
	     "hep-lat","hep-ph","hep-th","math","math-ph","nlin",
	     "nucl-ex","nucl-th","physics","q-bio","quant-ph","stat"];

let nature = ["natcomputsci", "natastron", "natbiomedeng",
	       "nenergy", "nnano", "natmachintell", "nbt",
	      "nmeth", "natecolevol", "nmicrobiol", "ng",
	      "nchembio", "natelectron", "micronano", "nphoton"
	      ];

router.get("/", (req, res) => {
    res.render("newspage", {list_arXiv: arXiv,
			    list_nature: nature});
});

router.get("/physorg", async (req, res, next) => {
    try {
	let feed = await parser.parseURL("https://phys.org/rss-feed");
	res.render("physorg", {data: feed});
    } catch(err) {
	next(err);
    }
});

for (let a of nature) {
    //console.log("https://www.nature.com/"+a+".rss")
    router.get("/nature/"+a, async (req, res, next) => {
	try {
	    let feed = await parser.parseURL("https://www.nature.com/"+a+".rss");
	    res.render("nature", {data:feed});
	} catch (err) {
            next(err);
	}
    });
}

for (let a of arXiv) {
    router.get("/arxiv/"+a, async (req, res, next) => {
	try {
	    let feed = await parser.parseURL("https://export.arxiv.org/rss/"+a);
	    res.render("arxiv", {data: feed});
	} catch (err) {
	    next(err)
	}
    });
}

router.get("/apod", async (req, res, next) => {
    try {
	let feed = await parser.parseURL("https://apod.nasa.gov/apod.rss");
	res.render("apod", {data: feed});
	} catch (err) {
            next(err);
	}
});

router.get("/physicsworld", async (req, res, next) => {
    try {
	let feed = await parser.parseURL("https://physicsworld.com/feed/");
	res.render("physicsworld", {data: feed});
	} catch (err) {
            next(err);
	}
});

router.get("/kernel", async (req, res, next) => {
    try {
	let feed = await parser.parseURL("https://www.kernel.org/feeds/kdist.xml");
	res.render("kernel", {data: feed});
	} catch (err) {
            next(err);
	}
});

router.get("/hubble", async (req, res, next) => {
    try {
	let feed = await parser.parseURL("http://feeds.feedburner.com/hubble_potw/");
	res.render("hubble", {data: feed});
	} catch (err) {
            next(err);
	}
});

router.get("/slackware", async (req, res, next) => {
    try {
	let feed = await parser.parseURL("https://mirrors.slackware.com/feeds/slackware64-current.rss");
	res.render("slackware", {data: feed});
	//res.send(feed);
	} catch (err) {
            next(err);
	}
});

router.get("/atel", async (req, res, next) => {
    try {
	let feed = await parser.parseURL("https://www.astronomerstelegram.org/?rss");
	res.render("atel", {data: feed});
	} catch (err) {
            next(err);
	}
});

router.get("/nasa", async (req, res, next) => {
    try {
	let feed = await parser.parseURL("https://www.nasa.gov/feed/");
	res.render("nasa", {data: feed});
	} catch (err) {
            next(err);
	}
});

router.get("/biorxiv", async (req, res, next) => {
    try {
	let feed = await parser.parseURL("http://connect.biorxiv.org/biorxiv_xml.php?subject=all");
	res.render("biorxiv", {data: feed});
	} catch (err) {
            next(err);
	}
});

router.get("/earthobservatory", async (req, res, next) => {
    try {
	let feed = await parser.parseURL("https://earthobservatory.nasa.gov/feeds/earth-observatory.rss");
	res.render("earthobservatory", {data: feed});
	} catch (err) {
            next(err);
	}
});

router.get("/plos", async (req, res, next) => {
    try {
	//let feed = await parser.parseURL("");
	let rss = await pfs.readFile(path.join(__dirname,'plosone_atom.rss'), "utf-8");
	let feed = await parser.parseString(rss);
	res.render("plos", {data: feed});
	//res.send(feed);
	} catch (err) {
            next(err);
	}
});

router.get("/eumesat", async (req, res, next) => {
    try {
	res.render("eumesat");
    } catch (err) {
	next(err);
    }
});

/*
  
  planetpython
  https://planetpython.org/rss20.xml

bioRxiv
https://www.biorxiv.org/

vixra
https://vixra.org/

*/

module.exports = router;
