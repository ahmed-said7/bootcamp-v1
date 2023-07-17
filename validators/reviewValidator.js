let validationMiddleware=require('../middlewares/validationMiddleware');
let {check}=require('express-validator');

let Review=require('../models/reviewModel');
let Bootcamp=require('../models/bootcampModel');


let createReviewValidator=[
    check('rating').notEmpty().withMessage('rating is rquired')
        .isNumeric().withMessage('rating must be a number')
        .toFloat({min:1,max:5}).withMessage('rating must be between 1 and 5')
        ,
        ,check('bootcamp').notEmpty().withMessage('user is required').
        isMongoId().withMessage('invalid id format').custom(async(val,{req})=>{
            let bootcamp=await Bootcamp.findById(val);
            if(!bootcamp){
                return Promise.reject(new Error('no bootcamp found'));
            }
            let review=await Review.find({bootcamp:req.body.bootcamp,user:req.user._id});
            if(review){
                return Promise.reject(new Error('you have already reviewed'));
            };
            return true;
        })
        ,
        validationMiddleware
];


let updateReviewValidator=[
    check('rating').optional()
        .isNumeric().withMessage('rating must be a number')
        .toFloat({min:1,max:5}).withMessage('rating must be between 1 and 5')
        ,
        check('id').
        isMongoId().withMessage('invalid id format')
        .custom(async(val,{req})=>{
            let review=await Review.findOne({_id:req.params.id,user:req.user._id});
            if(!review){
                return Promise.reject(new Error('you are not allowed review or review id are not provided'));
            };
            return true;
        })
        ,
        validationMiddleware
];


let deleteReviewValidator=[
    check('id').
        isMongoId().withMessage('invalid id format').custom(async(val,{req})=>{
            if(req.user.role==="user"){
                let review=await Review.findOne({_id:req.params.id,user:req.user._id});
            if(!review){
                return Promise.reject(new Error('you are not allowed review or review id are not provided'));
            };
            return true;
        }
            })
        ,
        validationMiddleware
];

let getReviewValidator=[
    check('id').
        isMongoId().withMessage('invalid id format')
    ,validationMiddleware
];


module.exports = {getReviewValidator,updateReviewValidator,deleteReviewValidator,createReviewValidator}