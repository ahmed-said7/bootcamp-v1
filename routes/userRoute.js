let router=require('express').Router();
let {protected,signup,login,allowedTo,forgetPassword,vertifyResetCode,changePassword}
    =require('../services/authServices');

let {logoutLoggedUser,getUsers,updateLoggedUser,getLoggedUser,getUser,
    deleteLoggedUser,createUser,updateLoggedUserPassword }=
    require('../services/userServices');
let {
    getUserValidator,updateLoggedUserValidator,
    createUserValidator,
    changeLoggedUserPasswordValidator,deleteUserValidator}=require('../validators/userValidator');

let {uploadSingleImage,uploadMultipleImage,resizeImage}=require('../middlewares/uploadImage');

router.route('/login').post(login);
router.route('/signup').post(createUserValidator,
    uploadSingleImage,resizeImage('users'),signup);
router.route('/forget-password').post(forgetPassword);
router.route('/vertify-code').post(vertifyResetCode);
router.route('/change-password').put(changePassword);



router.use(protected);

router.route('/').post(allowedTo('admin'),uploadSingleImage,resizeImage('users')
,createUserValidator,createUser)
    .get(allowedTo('admin'),getUsers);

router.use(allowedTo('admin','user'))

router.route('/:id').get(getUser);
router.route('/delete-me').delete(deleteUserValidator,deleteLoggedUser);
router.route('/update-me').put(updateLoggedUserValidator,updateLoggedUser);
router.route('/update-password').put(changeLoggedUserPasswordValidator,updateLoggedUserPassword);
router.route('/get-me').delete(getLoggedUser);
router.route('/logout').put(logoutLoggedUser);

module.exports = router;
