var sqlite3 = require('sqlite3');

var db = new sqlite3.Database('./var/db/users.db');
module.exports = db;
