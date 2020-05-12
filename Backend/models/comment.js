const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
    userTo: {
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    postId: {
        type:Schema.Types.ObjectId,
        ref: 'Product'
    },
    responseTo: {
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    content: {
        type: String
    }
},{timestamp: true})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = {Comment}
