const User = require('../models/user');
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

exports.addOrderToHistory =(req,res,next)=>{
    let history = []

    req.body.order.products.forEach((item)=>{
        history.push({
            _id:item._id,
            name:item.productName,
            description:item.productDesc,
            category:item.productCat,
            quantity:item.count,
            transaction_id:req.body.order.transaction_id,
            amount:req.body.order.amount
        })
    })

    User.findOneAndUpdate(
        {_id:req.profile._id},
        {$push:{userHistory:history}},
        {new:true},
        (error,data)=>{
            if(error){
                return res.status(400).json({
                    error:"Unable to update your purchase history"
                })
            }
            next();
        }
        );
}
