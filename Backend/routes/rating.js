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
    let variable = {}
    if (req.body.productId) {
        variable = {productId: req.body.productId, userId: req.body.userId, noOfStars: req.body.noOfStars}
    } else {
        variable = {commentId: req.body.commentId, userId: req.body.userId, noOfStars: req.body.noOfStars}
    }

})

// router.post("/like/uplike",(req, res) => {
//     let variable = { }
//     if(req.body.productId) {
//         variable = {productId: req.body.productId,firstName:req.body.firstName}
//     }else{
//         variable = {commentId: req.body.commentId,firstName:req.body.firstName}
//     }
//
//     const rate = new Rating(variable)
//     rate.save((err,rateResult) => {
//         if (err) return res.json({success:false,err});
//     })
// })

// router.post("/ratings/add",(req, res) => {
//     let rate = req.body;
//     let pID = req.body
//
//     Rating.find(
//         {productId:pID},
//         {rateVal}
//         )
//
//
//
// })

module.exports = router;
