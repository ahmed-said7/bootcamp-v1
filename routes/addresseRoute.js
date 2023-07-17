
let {
    getBootcampAddresse,getUserAddresse,
    removeBootcampAddresse,removeUserAddresse,
    addBootcampAddresse,addUserAddresse}=require('../services/addresseServices');

let {protected,allowedTo}
    =require('../services/authServices');

let router=require('express').Router();

router.use(protected,allowedTo('admin','user'));

router.route('/bootcamps')
    .get(getBootcampAddresse)
    .post(addBootcampAddresse)
    .delete(removeBootcampAddresse);

router.route('/users')
    .get(getUserAddresse)
    .post(addUserAddresse)
    .delete(removeUserAddresse);


module.exports=router;