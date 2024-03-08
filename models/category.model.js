const mongoose =require("mongoose");
const conn = require("./mongo.db");

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        index:true,
        unique:true,
    },
})

const categoryModel=conn.model("categories",categorySchema)
module.exports=categoryModel;