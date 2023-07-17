let Review=require('../models/reviewModel');
let {getAll,createOne,deleteOne,updateOne,getOne}=require('../services/handler');
let handler = require('express-async-handler');

let setUserToBody=handler(async(req,res,next)=>{
    if(!req.body.user){
        req.body.user=req.user._id;
    };
    next();
});

let setBootcampIdToBody=handler(async(req,res,next)=>{
    if(req.params.bootcampId){
        let filter={};
        filter.bootcamp=req.params.bootcampId;
        req.filter=filter;
    };
    next();
});

let createReview=createOne(Review);
let deleteReview=deleteOne(Review);
let getReviews=getAll(Review);
let updateReview=updateOne(Review);
let getReview=getOne(Review);

module.exports={setUserToBody,setBootcampIdToBody,createReview,deleteReview,getReviews,updateReview,getReview};