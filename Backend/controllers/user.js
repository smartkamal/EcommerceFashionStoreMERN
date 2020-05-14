const _ = require('lodash');
const User = require('../models/user');
const {errorHandler} = require("../helpers/dbErrorHandler");

exports.findUserById = (req, res, next, id) => {
    User.findById(id).exec((error,user) => {
        if (error || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        req.profile = user;
        next();
    });
};

exports.listUserData = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

exports.updateUserData = (req, res) => {
    const {firstName, lastName, password} = req.body;

    User.findOne({_id: req.profile._id}, (error, user) => {
        if (error || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        if (!firstName) {
            return res.status(400).json({
                error: 'First Name Required'
            });
        } else {
            user.firstName = firstName;
        }
        if (!lastName) {
            return res.status(400).json({
                error: 'Last Name Required'
            });
        } else {
            user.lastName = lastName;
        }

        if (password) {
            if (password.length < 6) {
                return res.status(400).json({
                    error: 'Password should atleast be 6 characters long'
                });
            } else {
                user.password = password;
            }
        }
        user.updated = Date.now();
        user.save((error, user) => {
            if (error){
                return res.status(400).json({
                    error: 'Cannot perform action'
                });
            }
            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user);
        });
    })
};

exports.listManagers = (req, res) => {
    User.find( { userType: 'manager' } ).exec((error, content) => {
        if(error){
            return res.status(400).json({
                error: errorHandler(error)
            });
        }
        res.json(content);
    });
};

exports.findManagerById = (req,res,next,id) =>{

    User.findById(id).exec((err, resManager) =>{
        if(err || !resManager){
            return res.status(400).json({
                error: "Manager not available"
            });
        }
        req.user = resManager;
        next();
    })
};

exports.deleteManager = (req,res) =>{
    let resManager = req.user;

    resManager.remove((err, deletedManager) =>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: "Manager deleted successfully"
        })
    })
};
