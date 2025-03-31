const mongoose=require('mongoose')
const Schema= mongoose.Schema
const bookSchema=new Schema({ //yesma chai schema chai mongoose ko euta class ho 
    bookName:{
        type:String
    },
    bookPrice:{
        type:String
    },
   isbnNumber:{
        type:Number
    },
   authorName:{
        type:String
    },
    publishedAt:{
        type:String
    },
    publication:{
        type:String
    },
    imageUrl:{
        type:String
    }
})
const Book=mongoose.model("Book",bookSchema) //mongoose.model le chai table ko naam define garx
module.exports=Book