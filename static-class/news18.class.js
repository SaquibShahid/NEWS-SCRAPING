exports.getNews18Lengauge=(url)=>{
const startInd=url.indexOf("http")
const endInd=url.indexOf(".com")
let baseUrl=url.substring(startInd,endInd)
const language=["odia","hindi","bengali","marathi","gujarati","kannada","tamil","malayalam","telugu","assam"];
return language.find((item)=>baseUrl.includes(item))
}

exports.getNews18Category=(lengauge,url)=>{
    if(lengauge=="english"){
        const categoryArray=['movies','cricket','india','politics','world','viral','business','opinion','education-career','elections']
        const urlArray=url.split("/")
        return urlArray.find((url)=>{
            return categoryArray.find((cate)=>{
                return url==cate
            })
        })
    }else if(lengauge=="bengali"){
        const categoryArray=['north-bengal','south-bengal','entertainment','job','sports','crime','off-beat','education-career']
        const urlArray=url.split("/")
        return urlArray.find((url)=>{
            return categoryArray.find((cate)=>{
                return url==cate
            })
        })
    }else{
        return undefined;
    }
}
exports.getNew18Class=(lengauge)=>{
    if(lengauge=="english"){
        return{
            titleClass:"article_heading",
            descriptionClass:"story_para_",
            imageClass:"article_bimg",
        }
    }else if(lengauge==="bengali"){
        return{
            titleClass:"nwarthd",
            descriptionClass:"nwartcntdtl",
            imageClass:"nwartbximg",
        }
    }else{
        return null;
    }
}