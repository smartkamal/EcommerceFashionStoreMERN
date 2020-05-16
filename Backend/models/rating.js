const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingSchema = mongoose.Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    rateVal:{
        type:Number,
        default:0
    }
},{timestamp: true})

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = {Rating}
