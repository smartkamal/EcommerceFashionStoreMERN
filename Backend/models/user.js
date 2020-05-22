const mongoose = require('mongoose');
const crypto = require('crypto'); //Hashes the password
const uuidv1 = require('uuid/v1');

const usersSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        lastName: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: 32
        },
        hashed_password: {
            type: String,
            required: true,
        },
        salt: String,
        userType: {
            type: String,
            default: "user"
        },
        userHistory: {
            type: Array,
            default: []
        },
        wishList:{
            type: Array,
            default: []
        }
    },
    {timestamps : true}
    );

//virtual fields
usersSchema.virtual('password')
.set(function (password) {
    this._password = password
    this.salt = uuidv1()
    this.hashed_password = this.encryptPassword(password)
})
.get(function () {
    return this._password;
});

usersSchema.methods = {

    //Return true if the encrypted password matches the hashed_password when sign in
    authenticateUser: function(text){
        return this.encryptPassword(text) === this.hashed_password
    },

    encryptPassword: function (password) {
        if (!password) return '';
        try {
            return crypto.createHmac('sha1',this.salt).update(password).digest("hex");
        }catch (err) {
            return "";
        }
    }
};

module.exports = mongoose.model("User", usersSchema);
