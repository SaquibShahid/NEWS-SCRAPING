const request=require("request-promise")
const cheerio=require("cheerio");
exports.createTheTimesOfIndiaNews=async(req,res)=>{
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
        const response=await request(url);
        const $=cheerio.load(response)

        const title=$(`h1.HNMDR span`).text()
        let description=$(`div.${classInfo.descriptionClass} p`).text()
        const image=$(`div.wJnIp img`).attr("src")
        return res.json({
            status:"success",
            message:"news create successfully",
            responseCode:200,
            data:{
                title,
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