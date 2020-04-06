const express = require('express');
const router = express.Router();

const {controlSignin, authenticatedUser} = require("../controllers/authentication");
const {findUserById} = require("../controllers/user");
const {generateToken,processPayment} = require("../controllers/braintree");

router.get('/braintree/getToken/:id',controlSignin, authenticatedUser, generateToken)
router.post('/braintree/payment/:id',controlSignin, authenticatedUser, processPayment)

router.param('userId',findUserById);
module.exports = router