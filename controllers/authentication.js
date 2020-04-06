const User = require('../models/user');
const jwtoken = require('jsonwebtoken'); //generate signed token
const expressJwt = require('express-jwt'); //check authorization
const {errorHandler} = require("../helpers/dbErrorHandler");

exports.signup = (req,res) =>{
    //console.log("req.body",req.body);
    const user = new User(req.body);
    user.save((error,user)=>{
        if (error){
            return res.status(400).json({
                error: errorHandler(error)
            });
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        })
    })
};

exports.signin = (req, res) =>{
    //find user from email
    const {email,password} = req.body
    User.findOne({email},(error, user)=> {
        if(error || !user){
            return res.status(400).json({
                error: 'User does not exist'
            });
        }
        //authenticate users by making sure that emails and passwords match
        if (!user.authenticateUser(password)){
            return res.status(401).json({
                error: 'Email or password invalid'
            });
        };
        //generate signed token
        const token = jwtoken.sign({_id: user._id}, process.env.JWT_SECRET)
        //keep the token as 'tn' in cookie with expiry date
        res.cookie('tn',token,{expire: new Date()+9999})
        //return response with user and token
        const {_id, firstName, lastName, userType} = user
        return res.json({token, user: {_id,email,firstName,lastName,userType}})
    });
};

exports.signout = (req,res) => {
    res.clearCookie('tn');
    res.json({message: 'Signed out successfully'})
};

exports.controlSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
});

exports.authenticatedUser = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id
    if (!user) {
        return res.status(403).json({
            error: 'Access denied'
        });
    }
    next();
};

exports.userAdmin = (req, res, next) => {
    if (req.profile.userType === "user" ){
        return res.status(403).json({
            error: 'Only admin access allowed'
        });
    }
    next();
}