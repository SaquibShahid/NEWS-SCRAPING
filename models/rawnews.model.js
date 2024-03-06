const mongoose =require("mongoose");
const conn = require("./mongo.db");

const rawNewsSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        index:true
    },
    description:{
        type:String,
        required:true,
        index:true
    },
    category:{
        type:String,
        required:true,
    },
    sourceUrl:{
        type:String,
        required:true,
    },
    channelName:{
        type:String,
        required:true,
    },
    tags:{
        type:Array,
        required:true
    }
})

const rawNewsModel=conn.model("rawnewses",rawNewsSchema)
module.exports=rawNewsModel;