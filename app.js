const express=require('express')
const app=express()

app.get('/',(req,res)=>{
    // console.log(req);
    
    res.send('hello world')
})







app.listen(4000,()=>{
    console.log('the server is running in port 4000');
    
})