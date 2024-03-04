const ndtvClass = require("../models/ndtvclass.model");
const log = require("../utils/log");
const request=require("request-promise")
const cheerio=require("cheerio");
const ndtvIndia = require("../models/ndtvindia.model");
const getNdtvClass = require("../static-class/ndtv.class");

exports.addNdtvCalss=async(req,res)=>{
    try{
        let {category,titleClass,descriptionClass,imageClass}=req.body;

        category=category?.trim()
        titleClass=titleClass?.trim()
        descriptionClass=descriptionClass?.trim()
        imageClass=imageClass?.trim()

        if(!category||!titleClass||!descriptionClass||!imageClass){
            return res.json({
                status:"error",
                message:"all field required",
                responseCode:500,
                data:null,
               }) 
        }

        const isCategory=await ndtvClass.findOne({category:category}).select({_id:1});
        if(isCategory!==null){
            return res.json({
                status:"error",
                message:"category allready exist",
                responseCode:500,
                data:null,
               }) 
        }

        const createClass=new ndtvClass({
            category:category,
            titleClass:[{className:titleClass}],
            descriptionClass:[{className:descriptionClass}],
            imageClass:[{className:imageClass}],
        })

        await createClass.save();

        return res.json({
            status:"success",
            message:"ndtv Class created successfully",
            responseCode:200,
            data:null,
           }) 

    }catch{
       return res.json({
        status:"error",
        message:error.message,
        responseCode:500,
        data:null,
       }) 
    }
}
exports.updateNdtvClass=async(req,res)=>{
    try{
    const {_id}=req.params;
    let {category,titleClass,descriptionClass,imageClass}=req.body;

    category=category?.trim()
    titleClass=titleClass?.trim()
    descriptionClass=descriptionClass?.trim()
    imageClass=imageClass?.trim()

    const updateQuery={
        $push:{

        }
    }
    if(titleClass){
        updateQuery.$push.titleClass={className:titleClass}
    }
    if(descriptionClass){
        updateQuery.$push.descriptionClass={className:descriptionClass}
    }
    if(imageClass){
        updateQuery.$push.imageClass={className:imageClass}
    }

    const updateClasses=await ndtvClass.updateOne({_id:_id},updateQuery)
    
    if(updateClasses.modifiedCount===0){
        return res.json({
            status:"error",
            message:"item not found",
            responseCode:500,
            data:null,
           })
    }

    return res.json({
        status:"success",
        message:"ndtv class updated successfully",
        responseCode:200,
        data:null,
       })

    }catch(error){
        return res.json({
            status:"error",
            message:error.message,
            responseCode:500,
            data:null,
           })
    }
}
exports.addNdtvIndiaNews=async(req,res)=>{
    try{
        let {url,category}=req.body;
        if(!url){
            return res.json({
                status:"error",
                message:"url required field",
                responseCode:500,
                data:null,
               })
        }
        const getClass=await ndtvClass.findOne({category:category}).select({_id:0,__v:0})
        if(getClass===null){
            return res.json({
                status:"error",
                message:"no category found first add category",
                responseCode:500,
                data:null,
               })
        }
        const response=await request(url);
        const $=cheerio.load(response)

        //fetch title from web
        let title=""
        let getTitleClassLength=getClass.titleClass.length;
        let index=0;
        while(title.length===0&&index<getTitleClassLength){
            title=$(`div.${getClass.titleClass[index].className} h1`).text()
            index++
        }

        //fetch image from web
        let image=undefined
        let getimageClassLength=getClass.imageClass.length;
        index=0;
        while(image===undefined&&index<getimageClassLength){
            image=$(`div.${getClass.imageClass[index].className} img`).attr("src")
            index++
        }

        //fetch image from web
        let description=""
        let getDescriptionClassLength=getClass.descriptionClass.length;
        index=0;
        while(description.length===0&&index<getDescriptionClassLength){
            description=$(`div.${getClass.descriptionClass[index].className} p:not(:first)`).text()
            index++
        }
        if(!title||!description||!image){
            return res.json({
                status:"error",
                message:"This url not giving all data",
                responseCode:200,
                data:null,
               })
        }
        const newNews=new ndtvIndia({
            title:title,
            imageUrl:image,
            description:description
        })
        await newNews.save()
        return res.json({
            status:"success",
            message:"news add successfully",
            responseCode:200,
            data:{title,image,description},
           })
        
    }catch(error){
        log(error)
            return res.json({
                status:"error",
                message:error.message,
                responseCode:500,
                data:null,
               })
        }
}

exports.createNdtvNews=async(req,res)=>{
    try{
        const {url,category}=req.body;
        if(!url||!category){
            return res.json({
                status:"error",
                message:"all field required",
                responseCode:500,
                data:null,
               })
        }
        const classInfo=getNdtvClass(category)
        if(classInfo===null){
            return res.json({
                status:"error",
                message:"catgory not found",
                responseCode:500,
                data:null,
               })
    
        }
        const response=await request(url);
        const $=cheerio.load(response)

        const title=$(`h1.${classInfo.titleClass}`).text()
       const description=$(`div.${classInfo.descriptionClass} p:not(:first)`).text()
        const image=$(`div.${classInfo.imageClass} img`).attr("src")

        return res.json({
            status:"success",
            message:"news create successfully",
            responseCode:200,
            data:{
            title,
            category,
            description,
            image
        },
           })

    }catch(error){
            return res.json({
                status:"error",
                message:error.message,
                responseCode:500,
                data:null,
               })
        }
}
