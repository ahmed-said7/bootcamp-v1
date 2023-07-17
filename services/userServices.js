

let User=require('../models/userModel');
let handler=require('express-async-handler');
const apiError = require('../utils/apiError');
let bcrybt=require('bcryptjs');


require('dotenv').config({path:'./environ.env'});


let createUser=handler(async(req,res,next)=>{
    let user=await User.create(req.body);
    if(!user){
        return next(new apiError('no user available',400));
    };
    res.status(200).json({status: 'success',user})
});


let getUsers=handler(async(req,res,next)=>{
    let search={};
    if(req.query.keyword){
        search.username={$rejex:req.query.keyword};
    };
    let users=await User.find(search).sort('-createdAt').select('-password -logout')
        .populate([{path:"following",select:"name email"},{path:"followers",select:"name email"}]);
    res.status(200).json({status: 'success',users});
});


let getUser=handler(async(req,res,next)=>{
    let user=await User.findById(req.params.id);
    if(!user){
        return next(new apiError('no user available',400));
    };
    res.status(200).json({status: 'success',user});
});


let getLoggedUser=handler(async(req,res,next)=>{
    let user=await User.findOne({email:req.user.email});
    if(!user){
        return next(new apiError('no user available',400));
    };
    res.status(200).json({status: 'success',user});
});


let deleteLoggedUser=handler(async(req,res,next)=>{
    let user=await User.findByIdAndDelete(req.user._id);
    res.status(200).json({status: 'success'});
});


let updateLoggedUser=handler(async(req,res,next)=>{
    let user=await User.findByIdAndUpdate(req.user._id,req.body,{new:true});
    res.status(200).json({status: 'success',user});
});


let updateLoggedUserPassword=handler(async(req,res,next)=>{
    let password=await bcrybt.hash(req.body.password,12);
    let passwordChangedAt=Date.now();
    let user=await User.findByIdAndUpdate(req.user._id,{password,passwordChangedAt},{new:true});
    res.status(200).json({status: 'success',user});
});

let logoutLoggedUser=handler(
    async(req,res,next)=>{
    await User.findByIdAndUpdate(req.user._id,{Logout:true},{new:true});
    res.status(200).json({result:"logged out"});
});


module.exports={
    logoutLoggedUser,getUsers,
    updateLoggedUser,getLoggedUser,getUser,
    deleteLoggedUser,createUser,updateLoggedUser,
    updateLoggedUserPassword
};