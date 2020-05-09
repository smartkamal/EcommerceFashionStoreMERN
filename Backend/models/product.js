const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;


const productSchema = new mongoose.Schema({

        productName: {
            type: String,
            required: true,
            trim: true,
            maxlength: 32
        },
        productPrice: {
            type:Number,
            required: true,
            trim: true,
        },
        productQuantity: {
            type: Number
        },
        soldQuantity: {
            type: Number,
            default: 0
        },
        productDisc: {
            type: Number,
            default: 0
        },
        productDesc: {
            type: String,
            required: true,
            maxlength: 3000
        },
        productImage:{
            data:Buffer,
            contentType: String
         },
        productCat: {
            type: ObjectId,
            ref:'ProductCategory',
            required: true,

        },
        shipping:{
            required:false,
            type:Boolean
        }
},
    {timestamps: true}

);


module.exports = mongoose.model("Product",productSchema);
