const express = require('express');
const router = express.Router();

const {controlSignin, authenticatedUser, userAdmin} = require('../controllers/authentication');



const {findUserById, listUserData, updateUserData, listManagers, deleteManager, findManagerById,userHistory,addToWishList,retrieveAllWishList} = require('../controllers/user');


router.get('/secret/:id', controlSignin, authenticatedUser, userAdmin, (req, res) => {
    res.json({
        user: req.profile
    });
});

router.get('/user/:id', controlSignin, authenticatedUser, listUserData);
router.put('/user/:id', controlSignin, authenticatedUser, updateUserData);

router.get('/list/storemanager',listManagers);
router.delete('/user/storemanager/delete/:managerID/:id',controlSignin, authenticatedUser,userAdmin, deleteManager);
router.get('/orders/by/user/:id', controlSignin, authenticatedUser, userHistory);


router.param('id', findUserById);
router.param('managerID', findManagerById)

module.exports = router;


