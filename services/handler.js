let handler=require('express-async-handler');
const apiError = require('../utils/apiError');

const factory = require('../services/factory');
let createOne=(model)=> handler(async(req,res,next)=>{
    let document=await model.create(req.body);
    if(!document){
        return next(new apiError('could not create',400));
    };
    res.status(200).json({status: 'success',rseult:document});
});

let updateOne=(model)=> handler(async(req,res,next)=>{
    let document=await model.findByIdAndUpdate(req.params.id,req.body,{new:true});
    if(!document){
        return next(new apiError('could not update',400));
    };
    await document.save();
    res.status(200).json({status: 'success',rseult:document});
});

let deleteOne=(model)=> handler(async(req,res,next)=>{
    let document=await model.findByIdAndDelete(req.params.id);
    if(!document){
        return next(new apiError('could not delete',400));
    };
    await document.remove();
    res.status(200).json({status: 'success',rseult:document});
});


let getOne=(model)=> handler(async(req,res,next)=>{
    let document=await model.findById(req.params.id);
    if(!document){
        return next(new apiError('could not find',400));
    };
    res.status(200).json({status: 'success',rseult:document});
});

let getAll=(model)=> handler(async(req,res,next)=>{
    let filter={};
    if(req.filter){
        filter={...req.filter}
    };
    let numberOfPages = await model.countDocuments();
    let object=new factory(model.find(filter),req.query).filter().
        selectFields().search().pagination(numberOfPages)
    let documents=await object.query;
    let pagination=object.paginationObject;
    if(!documents){
        return next(new apiError('could not delete',400));
    };
    res.status(200).json({status: 'success',rseult:documents,pagination});
});


module.exports={getAll,createOne,deleteOne,updateOne,getOne};