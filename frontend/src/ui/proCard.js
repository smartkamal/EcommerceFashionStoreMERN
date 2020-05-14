import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import GetImage from './ImageComp'
import {API} from "../Config";
import moment from 'moment'
import Badge from "react-bootstrap/Badge";
import {addItem,updateCartItem,removeCartItem} from "./cartHandler";
import Redirect from "react-router-dom/es/Redirect";
import {addWishItem, removeWishlistItem} from "./WishlistHandler";
import axios from "axios";
import Comments from "./Comments";
import Rating from "./Rating";

import {signIn, validate,isValidated} from "../validators";
const {user} = isValidated();





//check stock avilabilty
const stockAvailabilty = (quantity) =>{
    return (quantity > 0 ?

                <Badge  pill variant="primary">In Stock</Badge>: <Badge pill variant="warning">Out of stock</Badge>


    )

}

const checkDiscount = (discount, totPrice) =>{
   if(discount> 0){
       return(

           <h4>
               <Badge pill className="iconPM"  variant="danger">Discounted Price : {totPrice}</Badge>
           </h4>
       )
   }

}

const ProductCard = ({
                         product,
                         viewProductBtn=true,
                         addToCartBtn=true,
                         updateCartOpt=false,
                         removeItemBtn=false,
                         addToWishListBtn=true,
                         removeWishItemBtn=false,
                         setRun =f=>f,
                         run=undefined
}) =>{
    //creating add to cart
    const [ redirect, setRedirect]= useState(false);
    const [count, setCount]=useState(product.count);
    const [ wredirect, setWRedirect]= useState(false);

    const addToCart =()=>{
        addItem(product, ()=>{
                setRedirect(true)
        })
   };

    const addToWishList =()=>{
        addWishItem(product, ()=>{
            setWRedirect(true)
        })
    };
    const userCartRedirect = redirect=>{
        if(redirect){
            return <Redirect to="/cart"/>
        }
    };

    const userWishRedirect = wredirect=>{
        if(wredirect){
            return <Redirect to="/"/>
        }
    };
//increament and decreament values
    const handleChange = productId => event =>{
        setRun(!run);
        setCount(event.target.value <1 ? 1: event.target.value)
        if(event.target.value>=1){
            updateCartItem(productId,event.target.value)
        }
    }

    function refreshPage() {
        window.location.reload(false);
    }


    return<div className="card-deck" style={{margin:25}}>

        <div className="shadow p-1 mb-1 bg-white rounded">
            {userCartRedirect(redirect)}
            {userWishRedirect(wredirect)}
            <div className="card border-secondary mb-3" style={{ width: '25rem'}}>
            <img className="card-img-top" style={{maxHeight:"50%" }} src={`${API}/product/image/${product._id}`} alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">{product.productName}</h5>
                    <p className="card-text">{product.productDesc.substring(0,100)}</p>
                    <p className="card-text">Rs.{product.productPrice}</p>
                    <p className="card-text">Category :{product.productCat && product.productCat.categoryName}</p>
                    <p className="card-text">Product: Added {moment(product.createdAt).fromNow()} </p>
                    <div className="card-footer bg-transparent border-danger">

                        {stockAvailabilty(product.productQuantity)}
                        <br/><br/>
                        {checkDiscount(product.productDisc, product.totalDiscPrice)}
                        <br/><br/>

                        <Link to={`/product/${product._id}`}>
                            {
                                viewProductBtn &&    <Button className="form-control m-2" variant="outline-primary" >View Product</Button>
                            }

                        </Link>

                        {
                            addToWishListBtn && <Button className="form-control m-2" variant="outline-success" onClick={addToWishList}>Add to Wish List</Button>
                        }

                        {
                            addToCartBtn && <Button className="form-control m-2" variant="outline-success" onClick={addToCart}>Add to cart</Button>
                        }

                        {
                            removeItemBtn && <Button className="form-control m-2" variant="outline-danger"
                                                     onClick={()=>{removeCartItem(product._id);setRun(!run);refreshPage()}}>
                                Remove</Button>
                        }

                        {
                            updateCartOpt && <div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Adjust Quantity</span>
                                    </div>
                                    <input type="number" className="form-control m-2" value={count} onChange={handleChange(product._id)}/>
                                </div>
                            </div>
                        }

                        {
                            removeWishItemBtn && <Button className="form-control m-2" variant="outline-danger"
                                                     onClick={()=>{removeWishlistItem(product._id);setRun(!run);refreshPage()}}>
                                Remove</Button>
                        }

                    </div>
                </div>

             </div>
        </div>

    </div>




}


export default ProductCard
