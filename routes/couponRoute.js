
let {createCoupon,deleteCoupon,getCoupons,updateCoupon,
    getCoupon}=require('../services/couponServices');

let {protected,allowedTo}
    =require('../services/authServices');

let router=require('express').Router();
let {deleteCouponValidator,createCouponValidator,
    updateCouponValidator,getCouponValidator}=require('../validators/couponValidator');

router.use(protected,allowedTo('admin'));

router.route('/')
    .get(getCoupons)
    .post(createCouponValidator,createCoupon);


router.route('/:id')
    .get(getCouponValidator,getCoupon)
    .post(updateCouponValidator,updateCoupon)
    .delete(deleteCouponValidator,deleteCoupon);

module.exports=router;