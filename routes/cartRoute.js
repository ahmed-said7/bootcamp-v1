
let {addCourseToCart,deleteCourseFromCart,getLoggedUserCart,
    deleteLoggedUserCart,applyCoupon}=require('../services/cartServices');


let {deleteCartItemValidator,
    applyCouponValidator,createCartValidator}=require('../validators/cartValidator')

let {protected,allowedTo}
    =require('../services/authServices');

let router=require('express').Router();

router.use(protected,allowedTo('admin','user'));

router.route('/')
    .post(createCartValidator,addCourseToCart).get(getLoggedUserCart).delete(deleteLoggedUserCart);

router.route('/apply-coupon').post(applyCouponValidator,applyCoupon);

router.route('/:id')
    .delete(deleteCartItemValidator,deleteCourseFromCart)
//     .post(updateBootcamp).
//     delete(deleteBootcamp);

module.exports=router;