
let {setUserToBody,createBootcamp,deleteBootcamp,getBootcamps
    ,updateBootcamp,getBootcamp,
    getBootcampWithinRadius}=require('../services/bootcampServices');

let {protected,allowedTo}
    =require('../services/authServices');
let courseRouter=require('./courseRoute');
let reviewRouter=require('./reviewRoute');
let router=require('express').Router();

router.use('/:bootcampId/courses',courseRouter);
router.use('/:bootcampId/reviews',reviewRouter);
router.use(protected,allowedTo('admin','user'));
router.route('/')
    .get(getBootcamps)
    .post(setUserToBody,createBootcamp);

router.route('/:latlng/:distance').get(getBootcampWithinRadius);

router.route('/:id')
    .get(getBootcamp)
    .post(updateBootcamp).
    delete(deleteBootcamp);

module.exports=router;