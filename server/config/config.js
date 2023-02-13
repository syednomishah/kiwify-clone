
var live = false; // for server


var local = false; // for local development

// imports
var dbConfig = require('../database/config');


var prod = {
   // live creds here
   db: dbConfig.live,
   serverPort: 5000,
}

var dev = {
    // dev creds here
    db: dbConfig.dev,
    serverPort: 8282,
}

let config = live? prod: dev;

// if true will alter the table changes, without removing data
config.db.alterDB = false;


  
module.exports = config;

