const express = require('express');
const router = express.Router();

const {requireSignin, isAuth} = require("../constrollers/auth");
const {userById} = require("../constrollers/user");
const {generateToken,processPayment} = require("../constrollers/braintree");

router.get('/braintree/getToken/:userId',requireSignin, isAuth, generateToken)
router.post('/braintree/payment/:userId',requireSignin, isAuth, processPayment)

router.param('userId',userById);
module.exports = router