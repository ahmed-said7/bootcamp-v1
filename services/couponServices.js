let Coupon=require('../models/couponModel');
let {getAll,createOne,deleteOne,updateOne,getOne}=require('../services/handler');


let createCoupon=createOne(Coupon);
let deleteCoupon=deleteOne(Coupon);
let getCoupons=getAll(Coupon);
let updateCoupon=updateOne(Coupon);
let getCoupon=getOne(Coupon);

module.exports={createCoupon,deleteCoupon,getCoupons,updateCoupon,getCoupon};