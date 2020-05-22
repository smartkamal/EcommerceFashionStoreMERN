const express = require('express');
const router = express.Router();

const {controlSignin, authenticatedUser,userAdmin} = require("../controllers/authentication");
const {findUserById,addOrderToHistory} = require("../controllers/user");
const {create,ordersList,findOrderById} = require("../controllers/order");
const { updateQuantityDetails} = require("../controllers/product");

//POST methods
router.post(
    '/order/create/:id',
    controlSignin,
    authenticatedUser,
    addOrderToHistory,
    updateQuantityDetails,
    create
);

//GET Methods
router.get(
    '/order/list/:id',
    controlSignin,
    authenticatedUser,
    userAdmin,
    ordersList
);

router.get(
    '/order/state/:id',
    controlSignin,
    authenticatedUser,
    userAdmin,
);


router.param('id',findUserById);
router.param('orderId',findOrderById);
module.exports = router
