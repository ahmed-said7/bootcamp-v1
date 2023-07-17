
let {setUserToBody,createReview,deleteReview,getReviews,
    updateReview,getReview,setBootcampIdToBody}=require('../services/reviewServices');

let {protected,allowedTo}
    =require('../services/authServices');

let router=require('express').Router({mergeParams:true});

router.use(protected,allowedTo('admin','user'));

router.route('/')
    .get(setBootcampIdToBody,getReviews)
    .post(setUserToBody,createReview);


router.route('/:id')
    .get(getReview)
    .post(updateReview).
    delete(deleteReview);

module.exports=router;