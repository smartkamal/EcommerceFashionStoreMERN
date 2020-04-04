const express = require('express');
const router = express.Router();

const {signup} = require('../controllers/users');

router.post("/signup",signup);

module.exports = router;