
let {createCoupon,deleteCoupon,getCoupons,updateCoupon,
    getCoupon}=require('../services/couponServices');

let {protected,allowedTo}
    =require('../services/authServices');

let router=require('express').Router();

router.use(protected,allowedTo('admin'));

router.route('/')
    .get(getCoupons)
    .post(createCoupon);


router.route('/:id')
    .get(getCoupon)
    .post(updateCoupon)
    .delete(deleteCoupon);

module.exports=router;