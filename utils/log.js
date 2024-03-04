const log=(message,data)=>{
    if(data){
        console.log(message,data)
    }else{
        console.log(message)
    }
    return;
}
module.exports=log