var express = require('express');
var router = express.Router();
const fs = require('fs');
const { appendFile, mkdir } = require('fs/promises');
const { join } = require('path');
var touch = require("touch")

let items = [];
let wikifile = join(__dirname,'..', 'public', 'wiki', 'wikicontent.json');
fs.readFile(wikifile, async (err, buffer) => {
    if (err) {
		console.log('no wiki file, creating the folder');
		try {
		    const wikiFolder = join(__dirname,'..', 'public', 'wiki');
		    const createDir = await mkdir(wikiFolder, { recursive: true });
		    console.log(`created ${createDir}`);
		    touch(wikifile);
		} catch (err) {
		    console.error(err.message);
		}
    } else {
	//console.log(buffer.toString());
	items = JSON.parse(buffer.toString())['items'];
    }
});

/* GET wiki page. */
router.get('/', (req, res, next) => {
    var user = null;
    if (req.user) {
	user = req.user;
    }
    res.render('wiki', {data: items, user: user});
});

/* edit wiki page */
router.post('/edit', (req, res, next) => {
    var num = req.body.num;
    res.render('edit_wiki', {num: num, data: items[num]});
});

/* create wiki page. */
router.get('/create', (req, res, next) => {
    res.render('wiki_tinymce');
});

/* GET to http://localhost:3000/wiki/author */
router.get('/author', function(req, res) {
    res.json([
        { name: "Brian" }
    ]);
});

/* POST put_wiki page process /wiki/put_wiki */
router.post('/put_wiki', async (req, res, next) => {
    var name = req.body.wikiname;
    var content = req.body.content;
    var item = {'name': name, 'content': content};
    items.push(item);
    await appendFile(
	wikifile,
        JSON.stringify({items}),
            {
                encoding: 'utf-8',
                flag: 'w',
            },
        );
    //res.send('put wiki page'+req.body.hush+','+req.body.color);
    console.log('Put wiki at :' + Date.now());
    res.redirect(303, '/wiki');
});

module.exports = router;
