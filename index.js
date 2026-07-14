require("dotenv").config();
const express = require("express");
const cors= require("cors")
const db = require("./src/models");

const tutorialRoutes =require("./src/routes/tutorial.routes.js")
const errorHandler=require("./src/middleware/errorHandler.js")



const app =express();

app.use(express.json());

app.use(express.urlencoded({extended:true}))

app.get('/', (req,res)=>{

    res.json("Sequelize Backend is running successfully")
})

app.use("/api/tutorials", tutorialRoutes)

app.use((req,res)=> res.status(404).json({message:"Route not found"}))

app.use(errorHandler);



const PORT= process.env.PORT || 8000

db.sequelize
.authenticate()
.then(async()=>{
    console.log("Database Connected Successfully to MYSQL")


         await db.sequelize.sync();

    console.log("Tables synced successfully");

    app.listen(PORT, ()=>{console.log(`Backend is successfully running on port ${PORT}`)})
})
.catch((err)=>{
    console.log("unable to connect to database",err.message);
    process.exit(1);
})