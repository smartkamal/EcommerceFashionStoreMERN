import React, {useState,useEffect} from "react";
import Layout from "../ui/Layout";
import {isValidated} from "../validators";
import {ordersList,getStates,updateStates} from "./adminApi";
import {Link} from "react-router-dom";
import moment from "moment";


const Orders=()=>{
    const [orders,setOrders]=useState([]);
    const [states,setStates]=useState([]);
    const {user,token}=isValidated();

    const load=()=>{
        ordersList(user._id,token).then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setOrders(data)
            }
        });
    };

    const stateVals=()=>{
        getStates(user._id,token).then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setStates(data)
            }
        });
    };
    useEffect(()=>{
        load();
        stateVals();
    },[]);

    const ordersLength = ()=>{
      if(orders.length>0){
          return(
              <h2 className="text-danger ">Number of orders: {orders.length}</h2>
          )
      }else{
          return <h2 className="text-danger">There are no orders yet!</h2>

      }
    };

    const handleStateChange=(e,oId)=>{
        //console.log("update");
        updateStates(user._id,token,oId, e.target.value).then(
            data=>{
            if(data.error){
                console.log("State update failed");
            }else{
                load()
            }
        })
    }

   const disState =(o)=>(
     <div className="form-group">
         <h4 className="mark mb-4">
             State:{o.state}
         </h4>
         Select to Update the State:
         <select className="form-control" onChange={e=>handleStateChange(e,o._id)}>
                <option>Select state</option>
             {states.map((state, index)=>(<option key={index} value={state}>{state}</option>))}
         </select>
     </div>
   );
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
                                       {disState(o)}
                                   </li>
                                   <li className="list-group-item">
                                       Amount: ${o.amount}
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
