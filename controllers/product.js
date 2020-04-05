const Product = require('../models/product');
const fs = require('fs');
const formidable = require('formidable');
const _ = require('lodash');


exports.ProductAdd=(req,res) =>{

    let formData = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, data, files) =>{
        if(err){
            return res.status(400).json({
                error: 'Image cannot be uploaded'
            })
        }
        let product = new Product(data);

        if(files.productImage) {
            product.productImage.data = fs.readFileSync(files.productImage.path)
            product.productImage.contentType = files.productImage.type
        }

        product.save((err, result) =>{
            if(err){
                return res.status(400).json({
                    //error: errorHandler(err)
                })
            }
            res.json(result);
        })

    })
};