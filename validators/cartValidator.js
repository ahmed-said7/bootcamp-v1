let validationMiddleware=require('../middlewares/validationMiddleware');
let {check}=require('express-validator');
let Course=require('../models/courseModel');

let createCartValidator=[
    check('course').notEmpty().withMessage('productId is required')
    .isMongoId().withMessage('invalid format').custom((val,{req})=>{
        Course.findById(val).then((course)=>{
            if(!course){
                return Promise.reject(new Error('course not found'));
            };
        });
    }),
    validationMiddleware
];

let applyCouponValidator = [
    check("name").notEmpty().withMessage('coupon name is required')
    ,validationMiddleware
];

// let updateCartValidator = [
//     check("id").isMongoId().withMessage('Invalid Cart id format'),
//     check('course').optional()
//     ,
//     validationMiddleware,
// ];

let deleteCartItemValidator = [
    check("id").isMongoId().withMessage('Invalid Cart id format'),
    validationMiddleware,
];

module.exports={deleteCartItemValidator,applyCouponValidator,createCartValidator};