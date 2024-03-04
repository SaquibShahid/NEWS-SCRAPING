const express=require("express")
require("dotenv").config()
require("./models/mongo.db")
const bodyParser=require("body-parser");
const log = require("./utils/log");
const app=express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

const ndtvRouter=require("./routes/ndtv.routes")
const createNews=require("./routes/createnews.routes")

app.use('/ndtv',ndtvRouter)
app.use('/create',createNews)

app.listen(process.env.PORT,(error)=>{
    if(error){
        log("error form express connection",error.message)
    }else{
        log(`server running at PORT ${process.env.PORT}`)
    }
})