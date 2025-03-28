const mongoose=require('mongoose')
 const ConnectionString="mongodb+srv://sanil:sanil@cluster0.5mi9pwl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
 async function connectToDatabase(){
   await mongoose.connect(ConnectionString)
    console.log("connected To DB Successfully");
    
}
module.exports=connectToDatabase