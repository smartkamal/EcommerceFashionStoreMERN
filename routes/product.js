const express = require('express');
const router = express.Router();

const {ProductAdd, findProductById,getProduct,deleteProduct,updateProduct} = require("../controllers/product");
const {findUserById} = require("../controllers/user");
const {controlSignin,authenticatedUser,userAdmin} = require("../controllers/authentication");

router.post("/product/add/:id",controlSignin,authenticatedUser,userAdmin,ProductAdd);
router.get('/product/:productid',getProduct);
router.delete('/product/:productid/:id',controlSignin,authenticatedUser, userAdmin,deleteProduct);
router.put('/product/:productid/:id',controlSignin,authenticatedUser, userAdmin,updateProduct);

router.param('id',findUserById);
router.param('productid',findProductById);
module.exports = router;