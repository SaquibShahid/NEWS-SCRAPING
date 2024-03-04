const mongoose =require("mongoose")
const conn=require("./mongo.db")

const ndtvclassSchema=new mongoose.Schema({
    category:{
        type:String,
        required:true,
        index:true
    },
    titleClass:[{
        className:{
            type:String,
            required:true
    }
    }],
    descriptionClass:[{
        className:{
            type:String,
            required:true
        }
    }],
    imageClass:[{
        className:{
        type:String,
        required:true
    }
    }],
})

const ndtvClass=conn.model("ndtvclasses",ndtvclassSchema);
module.exports=ndtvClass;