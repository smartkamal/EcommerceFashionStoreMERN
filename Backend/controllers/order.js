const{Order,CartItems}=require('../models/order');
const{errorHandler}=require('../helpers/dbErrorHandler');

//find the order using order ID
exports.findOrderById =(req,res,next,id)=>{
    Order.findById(id)
        .populate('products.product','ProductName productPrice')
        .exec((err,order)=>{
            if(err||!order){
                return res.status(400).json({
                    error:errorHandler(err)
                });
            }
            req.order=order;
            next();
        })
}
//create new order object in mongo DB
exports.create=(req,res)=>{

    req.body.order.user=req.profile
    const order=new Order(req.body.order)
    order.save((error,data)=> {
        if(error){
            return res.status(400).json({
                error:errorHandler(error)
            });
        }
        res.json(data);
    })
};
// Listing order of the users
exports.ordersList=(req,res)=>{
    Order.find()
        .populate('user',"_id firstName lastName address")
        .sort("-created")
        .exec((err,orders)=>{
            if(err){
                return res.status(400).json({
                    error:errorHandler(err)
                });
            }
            res.json(orders);
        })

};
//getting the order status
exports.getState=(req,res)=>{
    res.json(Order.schema.path('state').enumValues);
};
// update status in DB
exports.updateStates=(req,res)=>{
    Order.update(
        {_id:req.body.orderId},
        {$set:{state:req.body.state}},
        (err,order)=>{
            if(err){
                return res.status(400).json({
                    error:'Unable to change the state'
                });
            }
            res.json(order);
        }
        )
};
