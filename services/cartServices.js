let handler=require('express-async-handler');
let Cart=require('../models/cartModel');
let Coupon=require('../models/couponModel');
let Course=require('../models/courseModel');
const apiError = require('../utils/apiError');



let addCourseToCart=handler(async(req,res,next)=>{
    let {courseId}=req.body;
    let course=await Course.findById(courseId);
    let cart=await Cart.findOne({user:req.user._id});
    if(!cart){
        cart=await Cart.create(
        {
            cartItems:{course:courseId,price:course.price},
            user:req.user._id,
        });
    }else{
        let index=cart.cartItems.findIndex( (item) => {return item.course == courseId});
        if(index>-1){
            return res.status(200).json({cart,message:"you bought the item before"})
        }else{
            cart.cartItems.push({course:courseId,price:course.price})
        }; 
    };
    let price=0;
    cart.cartItems.forEach((item)=>{
        price+=item.price*item.quantity;
    });
    cart.totalPrice=price;
    await cart.save();
    res.status(200).json({status:"success",cart});
});


let getLoggedUserCart=handler(async(req,res,next)=>{
    let cart=await Cart.findOne({user:req.user._id});
    if(!cart){
        return next(new apiError('cart not found',400));
    };
    res.status(200).json({status:"success",cart});
});


let deleteLoggedUserCart = handler(async(req,res,next)=>{
    let cart = await Cart.findOneAndDelete({user:req.user._id});
    if(!cart){
        return next(new apiError('cart not found',400));
    };
    res.status(200).json({status:"success"});
});



// let updateCourseFromCart=handler(async(req,res,next)=>{
//     let cart = await Cart.findOne({user:req.user._id});
//     if(!cart){
//         return next(new apiError('cart not found',400));
//     };
//     let index=cart.cartItems.findIndex((item)=>{ return item._id.toString() == req.params.id });
//     cart.cartItems[index].quantity=req.body.quantity;
//     let price=0;
//     cart.cartItems.forEach((item)=>{
//         price+=item.price*item.quantity;
//     });
//     cart.totalPrice=price;
//     await cart.save();
//     res.status(200).json({status:"success",cart});
// });



let deleteCourseFromCart = handler(async(req,res,next)=>{
    let cart = await Cart.findOne({user:req.user._id});
    if(!cart){
        return next(new apiError('cart not found',400));
    };
    let cartItems=cart.cartItems.filter((item)=>{return item._id != req.params.id});
    cart.cartItems=cartItems;
    let price=0;
    cart.cartItems.forEach((item)=>{
        price+=item.price*item.quantity;
    });
    cart.totalPrice=price;
    await cart.save();
    res.status(200).json({status:"success",cart});
});

let applyCoupon=handler(async(req,res,next)=>{
    let coupon=await Coupon.findOne({name:req.body.name,couponExpiredAt:{$lt:Date.now()}});
    if(!coupon){
        return next(new apiError('invalid coupon',400));
    };
    let cart = await Cart.findOne({user:req.user._id});
    if(!cart){
        return next(new apiError('cart not found',400));
    };
    cart.totalPriceAfterDiscount=cart.totalPrice-(cart.totalPrice*coupon.discount/100);
    await cart.save();
    res.status(200).json({status:"success",cart});
});


module.exports ={addCourseToCart,deleteCourseFromCart,getLoggedUserCart,deleteLoggedUserCart,applyCoupon};