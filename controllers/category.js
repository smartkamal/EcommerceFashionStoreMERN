const Category = require('../models/category');
const {errorHandler} = require("../helpers/dbErrorHandler");


exports.addCategory = (req,res)=>{
    const newCat = new Category(req.body);
    newCat.save((err,content) =>{
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            });
        }
        res.json({content});
    });
};
