
let {createOrder,updatePaidOrder,
    updateDeliveredOrder,getLoggedUserOrder,getSpecificOrder,checkoutSession

    }=require('../services/orderServices');

let {protected,allowedTo}
    =require('../services/authServices');

let router=require('express').Router();

router.use(protected,allowedTo('admin','user'));

router.route('/')
    .get(getLoggedUserOrder)
    .post(createOrder);

router.route('/:id')
    .get(getSpecificOrder);

router.route('/update-delivered/:id')
    .put(updateDeliveredOrder);

router.route('/update-paid/:id')
    .put(updatePaidOrder);

router.route('/checkout-session').post(checkoutSession)

module.exports=router;