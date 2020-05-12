const express = require('express');
const router = express.Router();

const {controlSignin, authenticatedUser} = require("../controllers/authentication");
const {findUserById} = require("../controllers/user");
const {generateToken,processPayment} = require("../controllers/checkout");

router.get('/braintree/getToken/:id',controlSignin, authenticatedUser, generateToken)
router.post('/braintree/payment/:id',controlSignin, authenticatedUser, processPayment)

router.param('id',findUserById);
module.exports = router
