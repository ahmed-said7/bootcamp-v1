let validationMiddleware=require('../middlewares/validationMiddleware');
let {check}=require('express-validator');
const couponModel = require('../models/couponModel');
// let slugify=require('slugify');
let createCouponValidator=[
    check('name').notEmpty().withMessage('name is required').
    isLength({min:4}).withMessage('name must be at least 6 characters')
    .isLength({max:20}).withMessage('name is too long').custom(async(val,{req})=>{
        couponModel.findOne({name:val}).then((coupon)=>{
            if(coupon){
                Promise.reject('name is duplicate ');
            };
        });
        return true;
    }),
    check('discount').notEmpty().withMessage('discount is required').
    isNumeric().withMessage('discount is not a number'),
    ,validationMiddleware
];

let getCouponValidator = [
    check('id').isMongoId().withMessage('Invalid Coupon id format'),
    validationMiddleware,
];

let updateCouponValidator = [
    check('id').isMongoId().withMessage('Invalid Coupon id format'),
    check('name').optional(),
    check('couponExpiredAt').optional().custom((val,{req})=>{
        if(val  < Date.now()){
            return new Error('  Invalid expiration date')
        }
    })
    ,
    check('discount').optional().isNumeric().withMessage('discount must be a number'),
    validationMiddleware,
];

let deleteCouponValidator = [
    check('id').isMongoId().withMessage('Invalid Coupon id format'),
    validationMiddleware,
];

module.exports =
{deleteCouponValidator,createCouponValidator,updateCouponValidator,getCouponValidator};