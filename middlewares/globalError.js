let handler=require('express-async-handler');
let globalError=handler(async(err,req,res,next)=>{
    res.status(err.statusCode || 400).json({message:err.message,error:err});
});
module.exports=globalError;