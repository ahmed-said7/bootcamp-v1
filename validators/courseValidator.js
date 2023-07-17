let validationMiddleware=require('../middlewares/validationMiddleware');
let {check}=require('express-validator');
let Course=require('../models/courseModel');
let Bootcamp=require('../models/bootcampModel');

let createCourseValidator=[
    check('name').notEmpty().withMessage('Please enter a name'),
    check('bootcamp').notEmpty().withMessage('Please enter a bootcamp')
    .isMongoId().withMessage('Please enter an Id').custom((val,{req})=>{
        Bootcamp.findById(val).then((bootcamp)=>{
            if(!bootcamp){
                return Promise.reject(new Error('Bootcamp not found'));
            };
        });
    }),
    check('weeks').notEmpty().withMessage('Please enter a number of weeks')
    .isNumeric().withMessage('field must be a number'),
    check('description').notEmpty().withMessage('description is required').isLength({min:30,max:200}).
    withMessage('Please enter a description between 30 and 200 characters'),
    check('price').notEmpty().withMessage('Please enter a price')
    .isNumeric().withMessage('field must be a number'),validationMiddleware
];

let updateCourseValidator=[
    check('id').isMongoId().withMessage('invalid Format'),
    check('bootcamp').optional()
    .isMongoId().withMessage('Please enter an Id').custom((val,{req})=>{
        Bootcamp.findById(val).then((bootcamp)=>{
            if(!bootcamp){
                return Promise.reject(new Error('Bootcamp not found'));
            };
        });
    }),
    check('weeks').optional()
    .isNumeric().withMessage('field must be a number'),
    check('description').optional().isLength({min:30,max:200}).
    withMessage('Please enter a description between 30 and 200 characters'),
    check('price').optional()
    .isNumeric().withMessage('field must be a number'),validationMiddleware
];


let getCourseValidator = [
    check("id").isMongoId().withMessage('Invalid Cart id format'),
    validationMiddleware,
];

let deleteCourseValidator = [
    check("id").isMongoId().withMessage('Invalid Cart id format'),
    validationMiddleware,
];


module.exports={updateCourseValidator,createCourseValidator,getCourseValidator,deleteCourseValidator};