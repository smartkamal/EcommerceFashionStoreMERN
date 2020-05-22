import React,{useEffect,useState} from 'react';


const{Rating}=require('../models/rating');

exports.RatingAdd=(res) =>{
    Rating.aggregate
    ({$group:{_id:'$productId',count:{$sum:1},avg:{$avg:'$noOfStars'}}},
        {$project:{_id:1,count:1,avg:{$round:['$avg',1]}}})
}
