const multer=require('multer')
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        const allowedFileTypes=['image/png','image/jpeg','image/jpg','image/webp'] //yo line of code le chai k vanx vanda kheri kasto format ko file haru chai accept hunx vancha
console.log(req.file);

        if(!allowedFileTypes.includes(file.mimetype)){
            cb(new Error('This file is not supported!!')) //cb(error)
            return //yesle le chai yedi condition milyo vane terminate handinx
        }
cb(null,'./storage')
    },
    filename:function(req,file,cb){
        
cb(null,Date.now()+ '-'+ file.originalname)
    }
})
module.exports={
    multer,storage
}