'use strict';
// require("dotenv").config();
const path = require('path');
const mysql2 = require('mysql2');
// const Sequelize = require('sequelize');
const config = require('../config/config').db;
const Sequelize = require('sequelize');
// import Sequelize from 'sequelize';

const fs = require('fs');


const basename = path.basename(__filename);
let dbConfig = {
  host:config.dbHost,
  dialect: config.dbDialect,
  // logging: a=>console.log('a mysql log: ',a)
}

if(config.dbPort) dbConfig.port = config.dbPort;

let sequelize=new Sequelize(config.dbName,config.dbUser,config.dbPassword,dbConfig);


let db={};
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
//config.get("database").rewrite || false
if (config.dbRewrite){
  // console.log('here: ',config);
  sequelize.sync({force:config.dbForceRewrite || false, alter: config.alterDB}).then(() => {
     console.log("overwrite everything")
  })
}

module.exports = db;
