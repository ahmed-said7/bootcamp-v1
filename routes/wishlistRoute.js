
let {addCourseToWishlist,removeCoursefromWishlist
    ,getLoggedUserWishlist}=require('../services/wishlistServices');
// handler=require('express-async-handler');
let {protected,allowedTo}
    =require('../services/authServices');

let router=require('express').Router();

router.use(protected,allowedTo('admin','user'));

router.route('/')
    .get(getLoggedUserWishlist)
    .post(addCourseToWishlist)
    .delete(removeCoursefromWishlist);


module.exports=router;