
const User = require('../models/user');
const Product = require('../models/product')
const _ = require('lodash');


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

// exports.addToWishList = (req,res) =>{
//
//
//     console.log('req',req.body.productID)
//     const id = req.body.productID;
//     const uid = req.params.id;
//      console.log("product",id)
//     console.log("user",uid)
//
//     console.log(id.objectId)
//
//     User.findOne({_id: req.params.id}, (error, user) => {
//         if (error || !user) {
//             return res.status(400).json({
//                 error: 'User not found'
//             });
//         }
//         User.update(
//             {_id: req.params.id},
//             {$addToSet: {wishList: id}},
//             console.log('i run')
//         )
//
//         user.save((error, user) => {
//             if (error){
//                 return res.status(400).json({
//                     error: 'Cannot perform action'
//                 });
//             }
//             res.json(user);
//         });
//     })
//
//         // res.json({
//         //     message: "Added Succesfully"
//         // })
//
// }