let handler=require('express-async-handler');
let Addresse=require('../models/addresseModel');
let Bootcamp=require('../models/bootcampModel');
let User=require('../models/userModel');
let addBootcampAddresse=handler(async(req,res,next)=>{
    let addresse=await Addresse.create(req.body);
    let bootcamp=await Bootcamp.findByIdAndUpdate(req.user._id
        ,{$addToSet:{addresse:addresse._id}},
        {new:true}).populate('addresse');
    res.status(200).json({result:bootcamp,status:'success'});
});

let removeBootcampAddresse=handler(async(req,res,next)=>{
    let addresse=await Addresse.create(req.body);
    let bootcamp=await Bootcamp.findByIdAndUpdate(req.user._id
        ,{$pull:{addresse:addresse._id}},
        {new:true}).populate('addresse');
    res.status(200).json({result:bootcamp,status:'success'});
});

let getBootcampAddresse=handler(async(req,res,next)=>{
    let bootcamp=await Bootcamp.findById(req.params.id).populate('addresse');
    res.status(200).json({result:bootcamp,status:'success'});
});

let addUserAddresse=handler(async(req,res,next)=>{
    let addresse=await Addresse.create(req.body);
    let user=await User.findByIdAndUpdate(req.user._id
        ,{$addToSet:{addresse:addresse._id}},
        {new:true}).populate('addresse');
    res.status(200).json({result:user,status:'success'});
});

let removeUserAddresse=handler(async(req,res,next)=>{
    let addresse=await Addresse.create(req.body);
    let user=await User.findByIdAndUpdate(req.user._id
        ,{$pull:{addresse:addresse._id}},
        {new:true}).populate('addresse');
    res.status(200).json({result:user,status:'success'});
});

let getUserAddresse=handler(async(req,res,next)=>{
    let user=await User.findById(req.params.id).populate('addresse');
    res.status(200).json({result:user,status:'success'});
});

module.exports={
    getBootcampAddresse,getUserAddresse,
    removeBootcampAddresse,removeUserAddresse,
    addBootcampAddresse,addUserAddresse};