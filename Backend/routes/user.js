const express = require('express');
const router = express.Router();

const {controlSignin, authenticatedUser, userAdmin} = require('../controllers/authentication');


const {findUserById, listUserData, updateUserData,addToWishList} = require('../controllers/user');

router.get('/secret/:id', controlSignin, authenticatedUser, userAdmin, (req, res) => {
    res.json({
        user: req.profile
    });
});

router.get('/user/:id', controlSignin, authenticatedUser, listUserData);
router.put('/user/:id', controlSignin, authenticatedUser, updateUserData);
//router.get('/user/:id', controlSignin, authenticatedUser, listUserData);
// router.post("/user/wishlist/add/:id", controlSignin,authenticatedUser,addToWishList) ;

router.param('id', findUserById);

module.exports = router;


