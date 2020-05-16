const express = require('express');
const router = express.Router();

const {controlSignin, authenticatedUser,userAdmin} = require("../controllers/authentication");
const {findUserById,addOrderToHistory} = require("../controllers/user");
const {create,ordersList,getState,findOrderById, updateStates} = require("../controllers/order");
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
    getState
);

//PUT Methods
router.put(
    '/order/:orderId/state/:id',
    controlSignin,
    authenticatedUser,
    userAdmin,
    updateStates
);

router.param('id',findUserById);
router.param('orderId',findOrderById);
module.exports = router
