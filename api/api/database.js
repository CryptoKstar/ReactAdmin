require('dotenv').config(); 

const SequelizeAuto = require('sequelize-auto');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);

/*
const options = { 
	caseModel: 'p',
	caseFile: 'p', 
	caseProp: 'p' 
};

const auto = new SequelizeAuto(sequelize, null, null, options);
auto.run();
*/

var initModels = require("./models/init-models");
module.exports = initModels(sequelize);
