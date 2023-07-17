
let {addCourseToCart,deleteCourseFromCart,getLoggedUserCart,
    deleteLoggedUserCart,applyCoupon}=require('../services/cartServices');

let {protected,allowedTo}
    =require('../services/authServices');

let router=require('express').Router();

router.use(protected,allowedTo('admin','user'));

router.route('/')
    .post(addCourseToCart).get(getLoggedUserCart).delete(deleteLoggedUserCart);

router.route('/apply-coupon').post(applyCoupon);

router.route('/:id')
    .delete(deleteCourseFromCart)
//     .post(updateBootcamp).
//     delete(deleteBootcamp);

module.exports=router;