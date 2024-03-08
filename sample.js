// try{

// }catch(error){
//         return res.json({
//             status:"error",
//             message:error.message,
//             responseCode:500,
//             data:null,
//            })
//     }

//     // const url="https://www.news18.com/education-career/on-this-day-in-2008-virat-kohli-led-india-to-u-19-world-cup-glory-8798010.html"
//     // console.log(url[22])
//     // let cp="education-career"
//     // console.log(url.substring(23,23+cp.length))

// //     const url2="https://bengali.news18.com/"
// //     const url1="https://news18marathi.com/"
// // const st=url2.indexOf("http")
// // const en=url2.indexOf(".com")
// // const sttt=url2.substring(st,en)
// // console.log(sttt.includes("bengali"))
// // const data="https://hindi.news18.com/news/haryana/chandigarh-city-breaking-news-jolt-for-india-coalition-in-chandigarh-bjp-won-senior-deputy-mayor-elections-aap-congress-8118430.html"
// // console.log(data.split('/'))

// const url="https://bengali.news18.com/news/job/frgdfrg/sdfsdf"
// const ct="job";
// let st=url.indexOf(ct);
// let temp=url.substring(st)

// if(temp==ct){
//     console.log("true")
// }else{
//     console.log("false")
// }

const request=require("request-promise")
const cheerio=require("cheerio");
const fun=async()=>{
try{
    const response=await request("https://www.republicworld.com/education/")
    const $=cheerio.load(response)
    console.log($("div.CatTopStoryListing").text())
}catch(err){
    // console.log(err.message)
}
}
fun()