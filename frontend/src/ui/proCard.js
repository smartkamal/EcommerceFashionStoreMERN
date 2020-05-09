import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import GetImage from './ImageComp'
import {API} from "../Config";
import moment from 'moment'
import Badge from "react-bootstrap/Badge";
import {addItem,updateCartItem,removeCartItem} from "./cartHandler";





//check stock avilabilty
const stockAvailabilty = (quantity) =>{
    return (quantity > 0 ?

                <Badge  pill variant="primary">In Stock</Badge>: <Badge pill variant="warning">Out of stock</Badge>


    )

}


const ProductCard = ({
                         product,
                         viewProductBtn=true,
                         addToCartBtn=true,
                         updateCartOpt=false,
                         removeItemBtn=false
}) =>{
    //creating add to cart
    const [ redirect, setRedirect]= useState(false);
    const [count, setCount]=useState(product.count);

    const addToCart =()=>{
        addItem(product, ()=>{
                setRedirect(true)
        })
   };
    const userRedirect = redirect=>{
        if(redirect){
            return <Redirect to="/cart"/>
        }
    };

    const handleChange = productId => event =>{
        setCount(event.target.value <1 ? 1: event.target.value)
        if(event.target.value>=1){
            updateCartItem(productId,event.target.value)
        }
    }

    return<div className="card-deck" style={{margin:25}}>
        <div className="shadow p-1 mb-1 bg-white rounded">
            {userRedirect(redirect)}
            <div className="card border-secondary mb-3" style={{ width: '25rem'}}>
            <img className="card-img-top" style={{maxHeight:"50%" }} src={`${API}/product/image/${product._id}`} alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">{product.productName}</h5>
                    <p className="card-text">{product.productDesc.substring(0,100)}</p>
                    <p className="card-text">Rs.{product.productPrice}</p>
                    <p className="card-text">Category :{product.productCat && product.productCat.categoryName}</p>
                    <p className="card-text">Product Added on {moment(product.createdAt).fromNow()} </p>
                    <div className="card-footer bg-transparent border-danger">

                        {stockAvailabilty(product.productQuantity)}
                        <br/><br/>

                        <Link to={`/product/${product._id}`}>
                            {
                                viewProductBtn &&    <Button variant="outline-primary" style={{ margin: 15}}>View Product</Button>
                            }

                        </Link>

                        {
                            addToCartBtn && <Button variant="outline-success" onClick={addToCart}>Add to cart</Button>
                        };

                        {
                            removeItemBtn && <Button variant="outline-danger" onClick={()=>removeCartItem(product._id)}>Remove</Button>
                        };

                        {
                            updateCartOpt && <div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Adjust Quantity</span>
                                    </div>
                                    <input type="number" className="form-control" value={count} onChange={handleChange(product._id)}/>
                                </div>
                            </div>
                        };

                    </div>
                </div>

             </div>
        </div>

    </div>
}


export default ProductCard
