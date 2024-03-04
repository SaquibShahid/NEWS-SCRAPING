const getNews18StaticData = require("../static-class/news18.class");
const request=require("request-promise")
const cheerio=require("cheerio");

exports.createNews18News=async(req,res)=>{
    try{
        const {url}=req.body;
        if(!url){
            return res.json({
                status:"error",
                message:"all field required",
                responseCode:500,
                data:null,
               })
        }
        let lengauge=getNews18StaticData.getNews18Lengauge(url)
        if(lengauge===undefined){
            lengauge="english"
        }

       let category=getNews18StaticData.getNews18Category(lengauge,url)
       if(category===undefined){
            return res.json({
                status:"error",
                message:"catgory not found",
                responseCode:500,
                data:null,
               })
        }

        const response=await request(url);
        const $=cheerio.load(response)

        const classInfo=getNews18StaticData.getNew18Class(lengauge)
        const title=$(`h1.${classInfo.titleClass}`).text()

        let description=""
        if(lengauge=="bengali"){
            description=$(`div.${classInfo.descriptionClass} p`).text()
        }else{
            console.log(classInfo.descriptionClass)
            let index=0;
            while(1){
                const des=$(`p.${classInfo.descriptionClass}${index}`).text()
                if(des.length===0){
                    break;
                }
                description+=des;
                index++;
            }
        }
        const image=$(`div.${classInfo.imageClass} img`).attr("src")
        return res.json({
            status:"success",
            message:"news create successfully",
            responseCode:200,
            data:{
                title,
                category,
                lengauge,
                description,
                image, 
                sourceUrl:url,  
        },
           })

    }catch(error){
        console.log(error)
            return res.json({
                status:"error",
                message:error.message,
                responseCode:500,
                data:null,
               })
        }
}