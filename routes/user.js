const express = require('express');
const router = express.Router();

const {controlSignin, authenticatedUser, userAdmin} = require('../controllers/authentication');


const {findUserById} = require('../controllers/user');

router.get('/secret/:id', controlSignin, authenticatedUser, userAdmin, (req, res) => {
    res.json({
        user: req.profile
    });
});

router.param('id', findUserById);

module.exports = router;


