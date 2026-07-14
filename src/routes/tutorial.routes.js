const express = require('express');
const controller= require('../controllers/tutorial.controller.js')

const {validateTutorialBody} =require("../middleware/validate.js")

const router = express.Router();

router.post("/",validateTutorialBody,controller.create);

router.get("/published", controller.findAllPublished);

router.get("/", controller.findAll);

router.get("/:id",controller.findOne);

router.put("/:id",controller.update);

router.delete("/:id",controller.delete);

router.delete("/",controller.deleteAll);

module.exports=router;

