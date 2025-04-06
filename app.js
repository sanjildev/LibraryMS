const express=require('express')
const fs=require('fs')
const connectToDatabase = require('./database')
const Book = require('./model/bookModel')

//multerconfig imports

const {multer,storage}=require('./middleware/multerConfig')
const upload=multer({storage:storage,limits:{fileSize:2000000}})

//cors package


const app=express()
app.use(express.json())  //hamile postman bata req pathuada node js le bujna sakdiana so tei vayer node js lai kura bujauna ko lagi hamile app.use(express.json()) vanni euta code lekhnu parx ani yo bahira bata frontend aauda use garinx like client side bata
const cors=require('cors')

app.use(cors({
    origin:'*' //yesle chai ab backend ra frontend lai connnect vayo vannale yedi frontend ra backend xuta xutai port ma vayeni yesle connect gardinx
}))
 connectToDatabase()
app.get('/',(req,res)=>{
    // console.log(req);
    
    res.send('bye world') //this is plain text
})

app.get('/home',(req,res)=>{
    res.status(200).json({
       "message":"Success"
    })
}) // this is json format


//create books
app.post('/book',upload.single('imageUrl'),async(req,res)=>{
 const {bookName,bookPrice,isbnNumber,authorName,publishedAt,publication,description}=req.body
let fileName;
if (!req.file){
    fileName="https://www.ultimato.com.br/image/atualiza_home/principal/ultimas/noticias/2017/01_jan/Not_31_01_17_Gutenberg.jpg"
}
else{
    fileName="http://localhost:5000/"+req.file.filename
}

 console.log(req.file);

   await Book.create({
        bookName,bookPrice,isbnNumber,authorName,publishedAt,publication,description,
        imageUrl:fileName
    })
    res.status(201).json({ //201--> created vaner janaux
        message:"book created  successfully"
    })
})



//sabai book ko data dincha (fetch all books)
app.get('/book',async(req,res)=>{
   const books=await Book.find() //return array garx
   res.status(200).json({ 
    message:"book fetched successfully",
    data:books
})
})



//euta book ko matra data dincha (fetch single book)
app.get('/book/:id',async (req,res)=>{
    const id=req.params.id
   const book= await Book.findById(id) //return object garx
   if(!book){
    res.status(404).json({
        message:"nothing found"
    })
}
    else{
        res.json({
            message:"single book triggered",
            data:book
        })
    }
    
})



//delete single book
app.delete('/book/:id',async(req,res)=>{
    const id=req.params.id
    const oldDatas=await Book.findById(id)
    const oldImagePath=oldDatas.imageUrl
    const localhostUrlLength="http://localhost:5000/".length
    const newOldImagePath=oldImagePath.slice(localhostUrlLength)
fs.unlink(`storage/${newOldImagePath}`,(err)=>{
    if(err){
        console.log(err);
        
    }
    else{
        console.log("file deleted successfully");
        
    }
})
  await Book.findByIdAndDelete(id)
    res.status(200).json({
        message:"book deleted successfully!!"
    })
 })

 


 //update book
 app.patch('/book/:id',upload.single('imageUrl'),async(req,res)=>{
const id=req.params.id
const {bookName,bookPrice,isbnNumber,authorName,publishedAt,publication,description}=req.body
const oldDatas=await Book.findById(id)
let fileName;
if(req.file){
    const oldImagePath=oldDatas.imageUrl
   console.log(oldImagePath);
   const localhostUrlLength="http://localhost:5000/".length
   const newOldImagePath=oldImagePath.slice(localhostUrlLength)   
   fs.unlink(`storage/${newOldImagePath}`,(err)=>{ //unlink ko kaam vaneko file delte garne 
    if(err){
        console.log(err);
        
    }
    else{
        console.log('file deleted successfully');
        
    }
   })
   fileName="http://localhost:5000/" + req.file.filename
}

await Book.findByIdAndUpdate(id,{
    bookName,bookPrice,isbnNumber,authorName,publishedAt,description,publication,imageUrl:fileName
})




res.status(200).json({
message:"book updated successfully!!",
})
 })

 app.use(express.static('./storage'))
app.listen(5000,()=>{
    console.log('the server is running in port 5000');
    
})