const express=require('express')
const connectToDatabase = require('./database')
const Book = require('./model/bookModel')
const app=express()
app.use(express.json())  //hamile postman bata req pathuada node js le bujna sakdiana so tei vayer node js lai kura bujauna ko lagi hamile app.use(express.json()) vanni euta code lekhnu parx ani yo bahira bata frontend aauda use garinx like client side bata

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
app.post('/book',async(req,res)=>{
 const {bookName,bookPrice,isbnNumber,authorName,publishedAt,publication}=req.body
   await Book.create({
        bookName,bookPrice,isbnNumber,authorName,publishedAt,publication
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
    
try {
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
} catch (error) {
    res.status(500).json({
        "message":"something went wrong"
    })
}
  
    
})
app.listen(5000,()=>{
    console.log('the server is running in port 5000');
    
})