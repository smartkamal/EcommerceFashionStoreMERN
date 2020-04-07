const mongoose = require("mongoose");



const productCategorySchema = new mongoose.Schema({

        categoryName: {
            type: String,
            required: true,
            trim: true,
            maxlength: 32
        }
    },
    {timestamps: true}

);


module.exports = mongoose.model("ProductCategory",productCategorySchema);