const ndtvController = require("../controllers/ndtv.controller")

const router=require("express").Router()

router.post('/create-class',ndtvController.addNdtvCalss)
router.post('/update-class/:_id',ndtvController.updateNdtvClass)
router.post('/create-india-news',ndtvController.addNdtvIndiaNews)


module.exports=router