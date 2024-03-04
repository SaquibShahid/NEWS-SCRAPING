const getNdtvClass=(type)=>{
    switch(type){
        case "india":{
            return {
                titleClass:"sp-ttl",
                descriptionClass:"ins_storybody",
                imageClass:"ins_instory_dv_cont",
            }
        }
        case "cricket":{
            return {
                titleClass:"sp-cn",
                descriptionClass:"story__content",
                imageClass:"ins_instory_dv_cont",
            }
        }
        default:return null
    }
}
module.exports=getNdtvClass;