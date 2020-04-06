const Product = require('../models/product');
const fs = require('fs');
const formidable = require('formidable');
const _ = require('lodash');
const {errorHandler} = require("../helpers/dbErrorHandler");


exports.ProductAdd=(req,res) =>{

    let formData = new formidable.IncomingForm();
    formData.keepExtensions = true;
    formData.parse(req, (err, data, files) =>{
        if(err){
            return res.status(400).json({
                error: 'Image cannot be uploaded'
            })
        }
        //check that all data is found
        const {productName,productPrice,productQuantity,productDesc,productCat,shipping}= data;

        if(!productName || !productPrice || !productQuantity || !productDesc || !productCat|| !shipping){
            return res.status(400).json({
                error:'Please fill all the fields'
            })
        }

        let product = new Product(data);

        if(files.productImage) {
            if(files.productImage.size>1000000){
                return res.status(400).json({
                    error: 'Image size is too big,please upload images less than 1 mb'
                });
            }
            product.productImage.data = fs.readFileSync(files.productImage.path);
            product.productImage.contentType = files.productImage.type
        }

        product.save((err, outcome) =>{
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(outcome);
        })

    })
};

exports.findProductById = (req,res,next,id) =>{

    Product.findById(id).exec((err, resProduct) =>{
        if(err || !resProduct){
            return res.status(400).json({
                error: "Product not available"
            });
        }
        req.product = resProduct;
        next();
    })
};

exports.getProduct = (req,res) =>{
    req.product.productImage = undefined;

    return res.json(req.product);
};


exports.deleteProduct = (req,res) =>{
    let resProduct = req.product;

    resProduct.remove((err,deletedProduct) =>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: "Product deleted successfully"
        })
    })
};


exports.updateProduct=(req,res) =>{

    let formData = new formidable.IncomingForm();
    formData.keepExtensions = true;
    formData.parse(req, (err, data, files) =>{
        if(err){
            return res.status(400).json({
                error: 'Image cannot be uploaded'
            })
        }
        //check that all data is found
        const {productName,productPrice,productQuantity,productDesc,productCat,shipping}= data;

        if(!productName || !productPrice || !productQuantity || !productDesc || !productCat|| !shipping){
            return res.status(400).json({
                error:'Please fill all the fields'
            })
        }

        let updatePro= req.product;

        updatePro = _.extend(updatePro,data);

        if(files.productImage) {
            if(files.productImage.size>1000000){
                return res.status(400).json({
                    error: 'Image size is too big,please upload images less than 1 mb'
                });
            }
            updatePro.productImage.data = fs.readFileSync(files.productImage.path);
            updatePro.productImage.contentType = files.productImage.type
        }

        updatePro.save((err, outcome) =>{
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(outcome);
        })

    })
};