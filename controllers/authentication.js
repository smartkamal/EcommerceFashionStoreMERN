require('dotenv').config();
const User = require('../models/user');
const jwt = require('jsonwebtoken'); //generate signed token which is uniques for each user
const expressJwt = require('express-jwt'); //check authorization by validating JWTs
const {errorHandler} = require("../helpers/ErrorHandler");
const nodemailer = require("nodemailer");

exports.signup = (req,res) =>{
    const user = new User(req.body);
    user.save((error,user)=> {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            });
        }

        //Hide the salt and hashed_password from user
        user.salt = undefined;
        user.hashed_password = undefined;

        res.json({
            user
        })

        if(user.userType == 'manager') {
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            });

            // send mail with defined transport object
            let mailOptions = {
                from: 'aubrellafashions@gmail.com', // sender address
                to: user.email, // list of receivers
                subject: "Congratulations!", // Subject line
                html: `<p>Dear ${user.firstName}</p><br><b>Congratulations <br> You are our new store Manager!!
                      </b> <br> Your username and password are attached below. <br> Username: ${user.email}
                       <br> Password: ${user.password}
                        <br> You can change your password once you log in to the system`

                };

            transporter.sendMail(mailOptions, function (err, content) {
                if (err) {
                    console.log("Error occured", err)
                } else {
                    console.log("Email sent")
                }
            })
        }
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
        //generate signed token with id and secret key
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
        //keep the token as 'tn' in cookie with expiry time of 9999 seconds
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

//Only logged in user have access to purchase items
exports.controlSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
});

//Checks if user is authenticated. The user can only access their profile
exports.authenticatedUser = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id
    if (!user) {
        return res.status(403).json({
            error: 'Access denied'
        });
    }
    next();
};

//Does not allow users to access the admin profile
exports.userAdmin = (req, res, next) => {
    if (req.profile.userType === "user" ){
        return res.status(403).json({
            error: 'Only admin access allowed'
        });
    }
    next();
}
