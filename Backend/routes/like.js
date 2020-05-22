const express = require('express');
const router = express.Router();

const {Like} = require('../models/Like')
const {Dislike} = require('../models/Dislike')

//get likes
router.post("/like/getLikes",(req, res) => {
    let variable = { }
    if(req.body.productId) {
        variable = {productId: req.body.productId}
    }else{
        variable = {commentId: req.body.commentId}
    }

    Like.find(variable)
        .exec((err,likes) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({success: true,likes})
        })
})

//get dislikes
router.post("/like/getDislikes",(req, res) => {
    let variable = { }
    if(req.body.productId) {
        variable = {productId: req.body.productId}
    }else{
        variable = {commentId: req.body.commentId}
    }

    Dislike.find(variable)
        .exec((err,dislikes) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({success: true,dislikes})
        })
})

//increase likes
router.post("/like/uplike",(req, res) => {
    let variable = { }
    if(req.body.productId) {
        variable = {productId: req.body.productId,firstName:req.body.firstName}
    }else{
        variable = {commentId: req.body.commentId,firstName:req.body.firstName}
    }

    const like = new Like(variable)
    like.save((err,likeResult) => {
        if (err) return res.json({success:false,err});
        Dislike.findOneAndDelete(variable)
            .exec((err,dislikeResult) => {
                if(err) return res.status(400).json({success:false, err});
                res.status(200).json({success:true})
        })
    })
})

//decrease likes
router.post("/like/unlike",(req, res) => {
    let variable = { }
    if(req.body.productId) {
        variable = {productId: req.body.productId,firstName:req.body.firstName}
    }else{
        variable = {commentId: req.body.commentId,firstName:req.body.firstName}
    }

    Like.findOneAndDelete(variable)
        .exec((err, result) => {
            if(err) return res.status(400).json({success:false,err});
            res.status(200).json({success:true})
    })
})

//increase dislike
router.post("/like/undislike",(req, res) => {
    let variable = { }
    if(req.body.productId) {
        variable = {productId: req.body.productId,firstName:req.body.firstName}
    }else{
        variable = {commentId: req.body.commentId,firstName:req.body.firstName}
    }
    Dislike.findOneAndDelete(variable)
        .exec((err, result) => {
            if(err) return res.status(400).json({success:false,err});
            res.status(200).json({success:true})
        })
})

//decrease dislike
router.post("/like/updislike",(req, res) => {
    let variable = { }
    if(req.body.productId) {
        variable = {productId: req.body.productId,firstName:req.body.firstName}
    }else{
        variable = {commentId: req.body.commentId,firstName:req.body.firstName}
    }
    const dislike = new Dislike(variable)
    dislike.save((err,dislikeResult) => {
        if (err) return res.json({success:false,err});
        Like.findOneAndDelete(variable)
            .exec((err,likeResult) => {
                if(err) return res.status(400).json({success:false, err});
                res.status(200).json({success:true})
            })
    })
})

module.exports = router;
