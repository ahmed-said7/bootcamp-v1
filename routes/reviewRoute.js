
let {setUserToBody,createReview,deleteReview,getReviews,
    updateReview,getReview,setBootcampIdToBody}=require('../services/reviewServices');

let {getReviewValidator,updateReviewValidator,deleteReviewValidator,createReviewValidator}=
require('../validators/reviewValidator')


let {protected,allowedTo}
    =require('../services/authServices');

let router=require('express').Router({mergeParams:true});

router.use(protected,allowedTo('admin','user'));

router.route('/')
    .get(setBootcampIdToBody,getReviews)
    .post(createReviewValidator,setUserToBody,createReview);


router.route('/:id')
    .get(getReviewValidator,getReview)
    .post(updateReviewValidator,updateReview).
    delete(deleteReviewValidator,deleteReview);

module.exports=router;