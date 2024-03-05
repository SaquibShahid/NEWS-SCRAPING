require("dotenv").config()
const platformModel = require("../models/platforms.model")
const request=require("request-promise")
const cheerio=require("cheerio");

const createPlatformsNews=async()=>{
    try{
        const platforms=await platformModel.find().select({__v:0});
        for(let platformsIndex=0;platformsIndex<platforms.length;platformsIndex++){

            let singlePlatforms=platforms[platformsIndex];
            let category=singlePlatforms.category;

            for(let categoryIndex=0;categoryIndex<category.length;categoryIndex++){
            const singleCategory=singlePlatforms.category[categoryIndex];
            const response=await request(singleCategory.url);
            let $=cheerio.load(response)
            const maniCalsss=singleCategory.listClasses.main;
            let container=null

            for(let i=0;i<maniCalsss.length;i++){
                container=$(singlePlatforms.category[0].listClasses.main[i])
               if(container.text().length>0){
                break;
               }
            }
            
            container.each(async function(index,element){
          
            const mainTitle=singleCategory.listClasses.title
            let title=null
            for(let i=0;i<mainTitle.length;i++){
                title=$(element).find(singleCategory.listClasses.title[i])
                if(title.text().length>0){
                    break;
                }
            }
     
            title.each(async(Tindex,Telement)=>{
                // const titleText=$(Telement).text()
                let detailsUrl=null;
                const mainUrl=singleCategory.listClasses.url;
                for(let i=0;i<mainUrl.length;i++){
                    detailsUrl=$(element).find(singleCategory.listClasses.url[i]).eq(Tindex).attr("href");
                    if(detailsUrl!==undefined){
                        break;
                    } 
                }
        
                if(detailsUrl!==undefined){
               {
               const detailsResponse=await request(detailsUrl)
               const $=cheerio.load(detailsResponse)

               const detailsTitleClass=singleCategory.detailsClass.title;
               let detailsTitle=null;
               for(let i=0;i<detailsTitleClass.length;i++){
                 detailsTitle=$(detailsTitleClass[i]).text()
                if(detailsTitle.length>0){
                    break;
                } 
               }

               const detailsImageClass=singleCategory.detailsClass.image;
               let detailsImage=null; 
               for(let i=0;i<detailsImageClass.length;i++){
                detailsImage=$(detailsImageClass[i]).attr("src")
                if(detailsImage!==undefined){
                    break;
                }
               }

               const detailsDescriptionClass=singleCategory.detailsClass.description;
               let detailsDescription=""
               for(let i=0;i<detailsDescriptionClass.length;i++){
                let desInd=0;
                while(1){
                 const des=$(`${detailsDescriptionClass[i]}${desInd}`).text()
                 if(des.length===0){
                     break;
                 }
                 detailsDescription+=des;
                 desInd++;
             }
             if(detailsDescription.length>0){
                break;
             }
               }
               let detailsTagClass=singleCategory.detailsClass.tags
               let detailsTag=[]
               for(let i=0;i<detailsTagClass.length;i++){
                $(detailsTagClass[i]).each((index,item)=>{
                    detailsTag.push($(item).text())
                    })
                    if(detailsTag.length>0){
                        break;
                    }
               }
            
        
               console.log({detailsTitle,detailsUrl,detailsImage,detailsDescription,detailsTag})
            }
                }
            
            })
        });
        
    }  
        }
        
    }
    catch(error){
      
    }
}
createPlatformsNews();