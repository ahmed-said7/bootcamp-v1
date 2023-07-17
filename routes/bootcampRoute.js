
let {setUserToBody,createBootcamp,deleteBootcamp,getBootcamps
    ,updateBootcamp,getBootcamp,
    getBootcampWithinRadius,bootcampOwner}=require('../services/bootcampServices');


let {updateBootcampValidator,createBootcampValidator,
    getBootcampValidator,deleteBootcampValidator}=require('../validators/bootcampValidator');

let {uploadSingleImage,uploadMultipleImage,resizeImage}=require('../middlewares/uploadImage');

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
    .post(createBootcampValidator,uploadSingleImage,resizeImage('bootcamps'),setUserToBody,createBootcamp);

router.route('/:latlng/:distance').get(getBootcampWithinRadius);

router.route('/:id')
    .get(getBootcampValidator,getBootcamp)
    .post(bootcampOwner,uploadSingleImage,
        resizeImage('bootcamps'),updateBootcampValidator,updateBootcamp).
    delete(bootcampOwner,deleteBootcampValidator,deleteBootcamp);

module.exports=router;