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

        const title=$(`h1.article_heading`).text()

        let description=""
        let index=0;
        while(1){
            const des=$(`p.story_para_${index}`).text()
            if(des.length===0){
                break;
            }
            description+=des;
            index++;
        }

        const image=$(`div.article_bimg img`).attr("src")

        return res.json({
            status:"success",
            message:"news create successfully",
            responseCode:200,
            data:{
            category,
            title,
            description,
            image,
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