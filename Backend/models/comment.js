const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
    userTo: {
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    postId: {
        type:Schema.Types.ObjectId,
        ref: 'product'
    },
    responseTo: {
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    content: {
        type: String
    }
},{timestamp: true})

const comment = mongoose.model('comment', commentSchema);

module.exports = {comment}
