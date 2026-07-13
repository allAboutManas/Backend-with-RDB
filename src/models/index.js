const dbConfig = require("../config/db.config.js")

const { Sequelize, DataTypes } =require("sequelize") 

const sequelize = new Sequelize (dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,{
    host:dbConfig.HOST,
    port:dbConfig.PORT,
    dialect:dbConfig.dialect,
    pool:dbConfig.pool,
    logging:console.log,

})

const db={};
db.Sequelize=Sequelize; // database instance created
db.sequelize=sequelize;

module.exports=db;