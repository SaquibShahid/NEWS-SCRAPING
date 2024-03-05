const mongoose =require("mongoose");
const conn = require("./mongo.db");

const allNewsesSchema=new mongoose.Schema({
    newsPlatform:{
        type:String,
        required:true,
        index:true
    },
    title:{
    type:String,
    required:true,
    index:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    sourceUrl:{
        type:String,
        required:true
    },
    tags:{
        type:Array,
        index:true
    }
})

const allNewsModel=conn.model("allnewses",allNewsesSchema)
module.exports=allNewsModel