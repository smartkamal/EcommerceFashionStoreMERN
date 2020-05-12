const User = require('../models/user');

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
    User.findOneAndUpdate({_id: req.profile._id}, {$set: req.body}, {new: true}, (error, user) =>{
        if (error){
            return res.status(400).json({
                error: 'Cannot perform action'
            });
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
    });
};
