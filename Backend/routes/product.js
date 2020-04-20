const express = require('express');
const router = express.Router();

const {ProductAdd, findProductById,getProduct,deleteProduct,
    updateProduct,listProducts,listRelatedProducts,listCategories,searchProd,retrieveImage} = require("../controllers/product");
const {findUserById} = require("../controllers/user");
const {controlSignin,authenticatedUser,userAdmin} = require("../controllers/authentication");

//product CRUD functions
router.post("/product/add/:id",controlSignin,authenticatedUser,userAdmin,ProductAdd);
router.get('/product/:productid',getProduct);
router.delete('/product/:productid/:id',controlSignin,authenticatedUser, userAdmin,deleteProduct);
router.put('/product/:productid/:id',controlSignin,authenticatedUser, userAdmin,updateProduct);



//product listing
router.get('/products', listProducts);
router.get('/products/categories',listCategories);
router.get('/products/related/:productid',listRelatedProducts);
router.post('/products/search',searchProd);

//product image get
router.get('/product/image/:productid',retrieveImage);

router.param('id',findUserById);
router.param('productid',findProductById);
module.exports = router;