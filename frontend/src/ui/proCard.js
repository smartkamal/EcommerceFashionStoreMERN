import React, { useState} from 'react'
import {Link} from 'react-router-dom'
import Button from "react-bootstrap/Button";
import {API} from "../Config";
import moment from 'moment'
import Badge from "react-bootstrap/Badge";
import {addItem,updateCartItem,removeCartItem} from "./cartHandler";
import Redirect from "react-router-dom/es/Redirect";
import {addWishItem, removeWishlistItem} from "./WishlistHandler";


import {isValidated} from "../validators";

import DisplayRating from "./DisplayRating";







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
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const {user,token} = isValidated();

    const addToWishListButton=(addWish)=>{
        if(user && user.userType === 'user'  ){
            return(

                addWish && <Button className="form-control mt-2 mr-2" variant="outline-warning" onClick={addToWishList}>Add to Wish List</Button>
                //addWish && <Button className="form-control m-2" variant="outline-warning" onClick={() => addWishList(pid)}>Add to Wish List</Button>

            )

        }
    }

    const addToCartButton=(addCart)=>{
        if(user && user.userType === 'user'){
            return(
                addCart && <Button className="form-control mt-2 mr-2" variant="success" onClick={addToCart}>Add to cart</Button>
            )

        }
    }

    const addToCart =()=>{
        addItem(product, ()=>{
                setRedirect(true)
        })
   };

    // const addWishList = (pid) =>{
    //
    //     addProToWishList({pid},user._id,token)
    //         .then(content => {
    //             if (content.error){
    //                console.log(error)
    //             }
    //             else {
    //
    //             }
    //         })
    // }


    const addToWishList =()=>{
        addWishItem(product, ()=>{
            setWRedirect(true)
        })

        // setError('');
        // setSuccess(false);
        // addUserWishList({productID},user._id,token,)
        //     .then(content => {
        //     if (content.error){
        //         setError(true);
        //     }
        //     else {
        //         setError('');
        //         setSuccess(true);
        //         setWRedirect(true)
        //     }
        // })
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


    return<div className="form-group" style={{margin:25}}>

        <div className="shadow bg-light rounded">
            {userCartRedirect(redirect)}
            {userWishRedirect(wredirect)}
            <div className="card border-secondary mb-3" style={{ width: '25rem'}}>
            <img className="card-img-top" style={{maxHeight:"50%" }} src={`${API}/product/image/${product._id}`} alt="productImage"/>
                <div className="card-body">
                    <h5 className="card-title">{product.productName}</h5>
                    <p className="card-text">{product.productDesc.substring(0,100)}</p>
                    <p className="card-text">Rs.{product.productPrice}</p>
                    <p className="card-text">Category :{product.productCat && product.productCat.categoryName}</p>
                    <p className="card-text">Product: Added {moment(product.createdAt).fromNow()} </p>
                    <DisplayRating pID={product._id} />
                    <div className="card-footer bg-transparent border-danger">
                        <div className="d-flex flex-row">

                            <div className="p-2">{stockAvailabilty(product.productQuantity)}</div>
                           {checkDiscount(product.productDisc, product.totalDiscPrice)}
                        </div>
                        <br/><br/>


                        <Link to={`/product/${product._id}`}>
                            {
                                viewProductBtn &&    <Button className="form-control mr-2" variant="outline-dark" >View Product</Button>
                            }

                        </Link>

                        {
                            //addToWishListBtn && <Button className="form-control m-2" variant="outline-success" onClick={addToWishList}>Add to Wish List</Button>
                            addToWishListButton(addToWishListBtn)
                            //addToWishListButton(addToWishListBtn,product._id)
                        }

                        {
                            //addToCartBtn && <Button className="form-control m-2" variant="outline-success" onClick={addToCart}>Add to cart</Button>
                            addToCartButton(addToCartBtn)
                        }

                        {
                            removeItemBtn && <Button className="form-control mt-2 mr-2" variant="danger"
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
                            removeWishItemBtn && <Button className="form-control mt-2" variant="danger"
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
