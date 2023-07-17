// let handler=require('express-async-handler');
let User=require('../models/userModel');
// let handler=require('express-async-handler');

let handler=require('express-async-handler');

let addCourseToWishlist=handler(async(req,res,next)=>{
    let user=await User.findByIdAndUpdate(
        req.user._id,
        {$addToSet:{wishlist:req.body.course}},
        {new:true}
        );
    res.status(200).json({result:user.wishlist});
});

let removeCoursefromWishlist=handler(async(req,res,next)=>{
    let user=await User.findByIdAndUpdate(
        req.user._id,
        {$pull:{wishlist:req.body.course}},
        {new:true}
        );
    res.status(200).json({result:user.wishlist});
});

let getLoggedUserWishlist=handler(async(req,res,next)=>{
    let user=await User.findById(
        req.user._id
        ).select('wishlist -_id');
    res.status(200).json({result:user});
});


module.exports={addCourseToWishlist,removeCoursefromWishlist,getLoggedUserWishlist};