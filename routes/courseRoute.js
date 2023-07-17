let {setUserToBody,createCourse,deleteCourse
    ,getCourses,updateCourse,getCourse,setBootcampIdToBody,courseOwner}=require('../services/courseServices');
let {protected,allowedTo}
    =require('../services/authServices');
let router=require('express').Router({mergeParams: true});

let {uploadSingleImage,uploadMultipleImage,resizeImage}=require('../middlewares/uploadImage');

let {updateCourseValidator,createCourseValidator,
    getCourseValidator,deleteCourseValidator}=require('../validators/courseValidator');


router.use(protected,allowedTo('admin','user'));
router.route('/')
    .get(setBootcampIdToBody,getCourses)
    .post(createCourseValidator,uploadSingleImage,resizeImage('courses'),setUserToBody,createCourse);

// router.route('/').get()

router.route('/:id')
    .get(getCourseValidator,getCourse)
    .post(courseOwner,uploadSingleImage,resizeImage('courses'),updateCourseValidator,updateCourse).
    delete(courseOwner,deleteCourseValidator,deleteCourse);

module.exports=router;