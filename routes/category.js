const express = require('express');
const router = express.Router();

const {addCategory} = require('../controllers/category');
const {controlSignin, authenticatedUser, userAdmin} = require('../controllers/authentication');
const {findUserById} = require('../controllers/user');

router.post("/category/add/:id", controlSignin,authenticatedUser,userAdmin,addCategory);

router.param('id', findUserById);
module.exports = router;