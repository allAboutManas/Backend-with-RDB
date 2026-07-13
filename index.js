require("dotenv").config();
const express = require("express");
const cors= require("cors")
const db = require("./src/models");


const app =express();

app.use(express.json());

app.use(express.urlencoded({extended:true}))

app.get('/', (req,res)=>{

    res.json("Sequelize Backend is running successfully")
})

const PORT= process.env.PORT || 8000

db.sequelize
.authenticate()
.then(()=>{
    console.log("Database Connected Successfully to MYSQL")


    app.listen(PORT, ()=>{console.log(`Backend is successfully running on port ${PORT}`)})
})
.catch((err)=>{
    console.log("unable to connect to database",err.message);
    process.exit(1);
})