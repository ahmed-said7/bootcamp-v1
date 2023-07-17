let router=require('express').Router();
let {protected,signup,login,allowedTo,forgetPassword,vertifyResetCode,changePassword}
    =require('../services/authServices');

let {logoutLoggedUser,getUsers,updateLoggedUser,getLoggedUser,getUser,
    deleteLoggedUser,createUser,updateLoggedUserPassword }=
    require('../services/userServices');


router.route('/login').post(login);
router.route('/signup').post(signup);
router.route('/forget-password').post(forgetPassword);
router.route('/vertify-code').post(vertifyResetCode);
router.route('/change-password').put(changePassword);



router.use(protected);

router.route('/').post(allowedTo('admin'),createUser)
    .get(allowedTo('admin'),getUsers);

router.use(allowedTo('admin','user'))

router.route('/:id').get(getUser);
router.route('/delete-me').delete(deleteLoggedUser);
router.route('/update-me').put(updateLoggedUser);
router.route('/update-password').put(updateLoggedUserPassword);
router.route('/get-me').delete(getLoggedUser);
router.route('/logout').put(logoutLoggedUser);

module.exports = router;
