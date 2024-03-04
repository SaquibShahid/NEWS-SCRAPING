exports.getNews18Lengauge=(url)=>{
const startInd=url.indexOf("http")
const endInd=url.indexOf(".com")
let baseUrl=url.substring(startInd,endInd)
const language=["odia","hindi","bengali","marathi","gujarati","kannada","tamil","malayalam","telugu","assam"];
return language.find((item)=>baseUrl.includes(item))
}

exports.getCategory=(lengauge)=>{
    if(lengauge=="english"){
        const categoryArray=['movies','cricket','india','politics','world','viral','business','opinion','education-career','elections']
        
        const baseurlLen=23;
        const category=categoryArray.find((item)=>{
            return item===url.substring(baseurlLen,baseurlLen+item.length)
        })
        return category;
    }
}
