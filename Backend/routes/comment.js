const express = require('express');
const router = express.Router();


const {Comment} = require('../models/comment')

router.post("/comments/saveComment",(req, res) => {
    const comment = new Comment(req.body)

    comment.save((err, comment) => {
        if (err) return res.json({success: false, err})
        Comment.find({'id':comment._id})
            .populate('writer')
            .exec((err, result) => {
                if (err) return res.json({success: false, err})
                return res.status(200).json({success: true,result})
            })
    })

})

router.post("/comments/getComments",(req, res) => {
    Comment.find({"postId": req.body.productId})
        .populate('writer')
        .exec((err, comments) => {
         if (err) return res.status(400).send(err)
         res.status(200).json({success: true,comments})
        })
})


module.exports = router;
