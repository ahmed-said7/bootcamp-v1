let handler=require('express-async-handler');
let Course=require('../models/courseModel');
let {getAll,createOne,deleteOne,updateOne,getOne}=require('../services/handler');
const apiError = require('../utils/apiError');


let courseOwner=handler(async(req,res,next)=>{
    let course=await Course.findOne({_id:req.params.id,user:req.user._id});
    if(!course){
        return next(new apiError('you are not allowed to access courses'));
    }
    next();
});

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
let createCourse=createOne(Course);
let deleteCourse=deleteOne(Course);
let getCourses=getAll(Course);
let updateCourse=updateOne(Course);
let getCourse=getOne(Course);

module.exports={setUserToBody,createCourse,deleteCourse,setBootcampIdToBody,
    getCourses,updateCourse,getCourse,courseOwner};