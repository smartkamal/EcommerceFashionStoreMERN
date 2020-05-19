
const User = require('../models/user');
const Product = require('../models/product')
const _ = require('lodash');
const {errorHandler} = require("../helpers/dbErrorHandler");
const{Order}=require('../models/order');


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


exports.userHistory=(req,res)=>{
    Order.find({user:req.profile._id})
        .populate('user','_id firstName')
        .sort('-created')
        .exec((err,orders)=>{
            if(err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(orders);
    })
}


exports.addToWishList = (req,res) =>{

    console.log(req.profile._id)
    console.log(req.body.pid)
    User.findOne({_id:req.profile._id}
    ,(err, user) =>{

            if (err || !user) {
                return res.status(400).json({
                    error: 'User not found'
                });
            }

            console.log(user.userType)
        let duplicate = false;
            user.wishList.forEach((wish) =>{
                if(wish.id === req.body.pid){
                    duplicate=true;
                }
            })

            if(duplicate){
                User.findOneAndUpdate(
                    {_id:req.params.userId, "wish.id":req.body.pid},
                    {$inc:{"wish.$.quantity":1}},
                    {new:true},
                    () =>{
                        if(err) return res.json({success:false,err});
                        res.status(200).json(user.wishList)
                    }
                    )
            }else{
                User.findOneAndUpdate(
                    {_id:req.profile._id},
                    {
                        $push:{
                            wishList:{
                                id:req.body.pid,
                                quantity:1,
                                date:Date.now()
                            }
                        }
                    },
                    {new:true},
                    (err,profile) =>{
                        if(err) return res.json({success:false, err});
                        res.status(200).json(profile.wishList)
                    }
                )
            }
        })

}


exports.retrieveAllWishList= (req,res) =>{

    let type= req.query.type;
    let productIdList = req.query.cartIDs

    if(type === "array"){
        let ids = req.query.cartIDs.split(',');
        productIdList = [];
        productIdList = ids.map(item =>{
            return item
        })
    }

    Product.findById({'_id':{$in:productIdList}})
        .populate("productCat")
        .exec((err, product) =>{
        if(err) return req.status(400).send(err)
            return res.status(200).send(product)
    })


};




