const mongoose =require("mongoose")
const conn=require("./mongo.db")

const ndtvIndiaSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true,
    }
})

const ndtvIndia=conn.model("ndtvindias",ndtvIndiaSchema)
module.exports=ndtvIndia;
