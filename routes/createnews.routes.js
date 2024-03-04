const ndtvNewsController = require("../controllers/ndtv.controller");
const news18NewsController = require("../controllers/news18.controller");


const router=require("express").Router()

router.post("/ndtv-news",ndtvNewsController.createNdtvNews);
router.post("/news18-news",news18NewsController.createNews18News);

module.exports=router