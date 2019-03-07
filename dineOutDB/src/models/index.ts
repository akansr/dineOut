'use strict';

let fs = require('fs'),
    path = require('path'),
    Sequelize = require('sequelize'),
    config = require('../configDB'),
    db: any = {};

const sequelize = new Sequelize(
    config.db.name,
    config.db.user,
    config.db.password,
    config.details
);

fs.readdirSync(__dirname)
    .filter(function(file){
        return (file.indexOf('.') !== 0) && (file !== 'index.ts');
    })
    .forEach(function(file){
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
