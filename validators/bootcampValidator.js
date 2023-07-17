let validationMiddleware=require('../middlewares/validationMiddleware');
let {check}=require('express-validator');
let Bootcamp=require('../models/bootcampModel');


let createBootcampValidator=[
    check('name').notEmpty().withMessage('Please enter a name'),
    check('description').notEmpty().withMessage('description is required').isLength({min:30,max:200}).
    withMessage('Please enter a description between 30 and 200 characters'),
    check('coordinates').notEmpty().withMessage('Please enter a coordinates'),
    check('careers').notEmpty().withMessage('Please enter a career'),
    check('email').notEmpty().withMessage('please enter your email address')
    .isEmail().withMessage('please enter your email address valid'),
    check('phone').notEmpty().withMessage('please enter your phone number')
    .isMobilePhone().withMessage('please enter your mobile phone number')
    ,validationMiddleware
];

let updateBootcampValidator=[
    check('id').isMongoId().withMessage('invalid Format'),
    check('description').optional().isLength({min:30,max:200}).
    withMessage('Please enter a description between 30 and 200 characters'),
    check('coordinates').optional().withMessage('Please enter a coordinates'),
    check('email').optional()
    .isEmail().withMessage('please enter your email address valid'),
    check('phone').optional()
    .isMobilePhone().withMessage('please enter your mobile phone number')
    ,validationMiddleware
];


let getBootcampValidator = [
    check("id").isMongoId().withMessage('Invalid Cart id format'),
    validationMiddleware,
];

let deleteBootcampValidator = [
    check("id").isMongoId().withMessage('Invalid Cart id format'),
    validationMiddleware,
];


module.exports={updateBootcampValidator,createBootcampValidator,getBootcampValidator,deleteBootcampValidator};