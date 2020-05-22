const{Order,CartItems}=require('../models/order');
const{errorHandler}=require('../helpers/ErrorHandler');

exports.findOrderById =(req,res,next,id)=>{
    Order.findById(id)
        .populate('products','ProductName productPrice')
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

exports.create=(req,res)=>{
    //console.log("Order:",req.body);
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

exports.getState=(req,res)=>{
    res.json(Order.schema.path('state').enumValues);
};

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
