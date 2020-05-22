import React, {useState,useEffect} from "react";
import Layout from "../ui/Layout";
import {isValidated} from "../validators";
import {ordersList} from "./storeManagerApi";
import moment from "moment";


const Orders=()=>{
    const [orders,setOrders]=useState([]);
    const {user,token}=isValidated();

//Load th eorder from the DB
    const load=()=>{
        ordersList(user._id,token).then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setOrders(data)
            }
        });
    };
    useEffect(()=>{
        load();
    },[]);
//Get the number of orders
    const ordersLength = ()=>{
      if(orders.length>0){
          return(
              <h2 className="text-danger ">Number of orders: {orders.length}</h2>
          )
      }else{
          return <h2 className="text-danger">There are no orders yet!</h2>

      }
    };
    return (
        <Layout title="Orders" description={`Hello ${user.firstName}, Manage Your orders`}
                className="container col-md-6 offset-md-3">

           <div className="row">
               <div className="col-md-8 offset-md-2">
                   {ordersLength()}
                   {orders.map((o,oIndex)=>{
                       return(
                           <div className="mt-5" key={oIndex} style={{borderBottom:"5px solid indigo"}}>
                               <h4 className="mb-5">
                                   <span className="bg-success">Order ID:{o._id} </span>
                               </h4>

                               <ul className="list-group mb-2">
                                   <li className="list-group-item">
                                       Amount: Rs:{o.amount}
                                   </li>
                                   <li className="list-group-item">
                                       Ordered by:{o.user.firstName}
                                   </li>
                                   <li className="list-group-item">
                                        Ordered Date: {moment(o.createdAt).fromNow()}
                                   </li>
                                   <li className="list-group-item">
                                      Delivery to: {o.address}
                                   </li>
                               </ul>
                               <h4 className="mt-4 mb-4 font-italic">
                                   Total products in the order: {o.products.length}
                               </h4>
                           </div>
                       );
                   })}
               </div>

           </div>
        </Layout>
    )
}
export default Orders;
