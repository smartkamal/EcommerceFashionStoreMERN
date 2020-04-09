const express = require('express');
const router = express.Router();

const {addCategory, findCategoryById, contentRead, updateCategory, deleteCategory, listCategories} = require('../controllers/category');
const {controlSignin, authenticatedUser, userAdmin} = require('../controllers/authentication');
const {findUserById} = require('../controllers/user');

router.post("/category/add/:id", controlSignin,authenticatedUser,userAdmin,addCategory);
router.get("/category/:catId", contentRead);
router.put("/category/:catId/:id", controlSignin,authenticatedUser,userAdmin,updateCategory);
router.delete("/category/:catId/:id", controlSignin,authenticatedUser,userAdmin,deleteCategory);
router.get("/categoryList", listCategories);


router.param('id', findUserById);
router.param('catId', findCategoryById);

module.exports = router;