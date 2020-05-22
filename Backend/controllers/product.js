const Product = require('../models/product');
const fs = require('fs');
const formidable = require('formidable');
const _ = require('lodash');
const {errorHandler} = require("../helpers/dbErrorHandler");


//method to add all the form data to the database
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
                error:'Please fill out all the fields'
            })
        }

        //initilize a new product object
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

//method to search for the product by passing the id
exports.findProductById = (req,res,next,id) =>{

    Product.findById(id).populate("productCat").exec((err, resProduct) =>{
        if(err || !resProduct){
            return res.status(400).json({
                error: "Product not available"
            });
        }
        req.product = resProduct;
        next();
    })
};

//get all the products without image
exports.getProduct = (req,res) =>{
    req.product.productImage = undefined;

    return res.json(req.product);
};

//delete a product
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

//update a product
exports.updateProduct=(req,res) =>{

    let formData = new formidable.IncomingForm();
    formData.keepExtensions = true;
    formData.parse(req, (err, data, files) =>{
        if(err){
            return res.status(400).json({
                error: 'Image cannot be uploaded'
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


//retrieve product image
exports.retrieveImage = (req,res,next) =>{
    if(req.product.productImage.data){
        res.set('Content-Type',req.product.productImage.contentType);
        return res.send(req.product.productImage.data)
    }
    next();
};


/*fetch the product list to the front end depending on sell/ arrival of
item
 */

exports.listProducts = (req,res) =>{
    //ways in which a reqest can come from the front end to list items
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let order = req.query.order ? req.query.order : 'asc';
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Product.find()
        .select("-productImage")
        .populate("productCat")
        .sort([[sortBy , order]])
        .limit(limit)
        .exec((err, result) =>{
            if(err){
                return res.status(400).json({
                    error: 'Products unavailable'
                })
            }
            res.json(result);
        })

};

//products under the corresponding category will be listed
exports.listRelatedProducts = (req,res) =>{

    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Product.find({_id : {$ne:req.product}, productCat:req.product.productCat})
        .populate('productCat','_id productName')
        .limit(limit)
        .exec((err,result) =>{
            if(err){
                return res.status(400).json({
                    error: 'Products unavailable'
                })
            }
            res.json(result);
        })
};

//list down the categories which have products
exports.listCategories = (req,res) =>{
    Product.distinct("productCat", {} , (err,catResult)=>{
        if(err){
            return res.status(400).json({
                error: 'Categories unavailable'
            })
        }
        res.json(catResult);

    })
};

//product find for search
exports.searchProd= (req, res) => {
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let order = req.body.order ? req.body.order : "desc";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip= parseInt(req.body.skip);
    let searchArgs = {};


    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
                searchArgs[key] = req.body.filters[key];
        }
    }

    if(searchArgs.category == null){
        Product.find(searchArgs)
            .select("-productImage")
            .populate("productCat")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: "Products unavailable"
                    });
                }

                res.json({
                    size: result.length,
                    result
                });


            });
    }else{
        Product.find({productCat:searchArgs.category})
            .select("-productImage")
            .populate("productCat")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: "Products unavailable"
                    });
                }

                res.json({
                    size: result.length,
                    result
                });


            });
    }

};

//search a product list by passing a query
exports.searchProdList = (req,res) =>{

    const query = {}

    if(req.query.searchVal){
        query.productName = {$regex: req.query.searchVal, $options:'i'}

        if(req.query.aCategory && req.query.aCategory !== 'All' ){
            query.productCat = req.query.aCategory

        }

        Product.find(query, (error, products) =>{
            if(error){
                return res.status(400).json({
                    error:errorHandler(error)
                })
            }

            res.json(products)

        }).select('-productImage')
    }

}

//update the quantity details of a product
exports.updateQuantityDetails=(req,res,next)=>{
    let bulkOps=req.body.order.products.map((item)=>{
        return{
            updateOne:{
                filter:{_id:item._id},
                update:{$inc:{productQuantity:-item.count,soldQuantity:+item.count}}
            }
        };

    });
    Product.bulkWrite(bulkOps,{},(error,products)=>{
        if(error){
            return res.status(400).json({
                error:"Unable to update the product"
            });
        }
        next();
    });
}
