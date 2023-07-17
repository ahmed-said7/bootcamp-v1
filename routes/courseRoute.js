let {setUserToBody,createCourse,deleteCourse
    ,getCourses,updateCourse,getCourse,setBootcampIdToBody}=require('../services/courseServices');
let {protected,allowedTo}
    =require('../services/authServices');
let router=require('express').Router({mergeParams: true});
router.use(protected,allowedTo('admin','user'));
router.route('/')
    .get(setBootcampIdToBody,getCourses)
    .post(setUserToBody,createCourse);

// router.route('/').get()

router.route('/:id')
    .get(getCourse)
    .post(updateCourse).
    delete(deleteCourse);

module.exports=router;