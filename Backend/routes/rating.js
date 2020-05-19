const express = require('express');
const router = express.Router();

const {Rating} = require('../models/rating')

router.post("/rating/getRatings",(req, res) => {
    let variable = { }
    if(req.body.productId) {
        variable = {productId: req.body.productId}
    }else{
        variable = {commentId: req.body.commentId}
    }

    Rating.find(variable)
        .exec((err,ratings) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({success: true,ratings})
        })
})

router.post("/rating/uprate",(req, res) => {
    let variable = { }
    if(req.body.productId) {
        variable = {productId: req.body.productId,UserId:req.body.UserId,noOfStars:req.body.noOfStars}
    }else{
        variable = {commentId: req.body.commentId,UserId:req.body.UserId,noOfStars:req.body.noOfStars}
    }

    const rate = new Rating(variable)
    rate.save((err,rateResult) => {
        if (err) return res.json({success:false,err});
    })
})

module.exports = router;
