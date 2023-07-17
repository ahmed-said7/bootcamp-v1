let multer=require('multer');
const apiError = require('../utils/apiError');
let handler=require('express-async-handler');
let uuid=require('uuid');
let sharp=require('sharp');

let uploadImage=function(){
    let multerStorage=multer.memoryStorage();
    let filter=function(req,file,cb){
        // "".startsWith
        console.log(file);
        if(file.mimetype.startsWith('image')){
            cb(null,true);
        }else{
            cb(new apiError('allowed images only',400),false);
        };
    };
    return multer({storage:multerStorage,fileFilter:filter});
};

let uploadSingleImage=(field)=> uploadImage().single(field);
let uploadMultipleImage=(field)=> uploadImage().fields(field);

let resizeImage=(field) =>handler(async(req,res,next)=>{
    if(req.file.photo){
        let fileName=`${field}-${uuid.v4()}-${Date.now()}`
        await sharp(req.file.photo.buffer).resize(600,600)
        .toFormat('jpeg').jpeg({quality:90}).toFile(`uploads/${field}/${fileName}`)
        req.body.photo=fileName;
    };
    next();
});


module.exports = {uploadSingleImage,uploadMultipleImage};