// let handler=require('express-async-handler');
let handler=require('express-async-handler');
let Bootcamp=require('../models/bootcampModel');
let {getAll,createOne,deleteOne,updateOne,getOne}=require('../services/handler');

let bootcampOwner=handler(async(req,res,next)=>{
    let course=await Bootcamp.findOne({_id:req.params.id,user:req.user._id});
    if(!course){
        return next(new apiError('you are not allowed to access bootcamps'));
    }
    next();
});

let setUserToBody=handler(async(req,res,next)=>{
    if(!req.body.user){
        req.body.user=req.user._id;
    };
    next();
});
let createBootcamp=createOne(Bootcamp);
let deleteBootcamp=deleteOne(Bootcamp);
let getBootcamps=getAll(Bootcamp);
let updateBootcamp=updateOne(Bootcamp);
let getBootcamp=getOne(Bootcamp);

let getBootcampWithinRadius=handler(async(req,res,next)=>{
    let lat=req.params.latlng.split(',')[0];
    let lng=req.params.latlng.split(',')[1];
    let radius=req.params.distance / 3963.2;
    let bootcamps=await Bootcamp.find({coordinates: { $geoWithin: 
        { $centerSphere: [ [ lat, lng ], radius ] } }});
    res.status(200).json({data:bootcamps,status:"success"});
});

module.exports={getBootcampWithinRadius,setUserToBody,createBootcamp,deleteBootcamp,
    getBootcamps,updateBootcamp,getBootcamp,bootcampOwner};