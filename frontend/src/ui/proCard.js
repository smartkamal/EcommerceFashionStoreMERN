import React from 'react'
import {Link} from 'react-router-dom'

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import GetImage from './ImageComp'
import {API} from "../Config";
import moment from 'moment'
import Badge from "react-bootstrap/Badge";


//add to cart view
const loadAddToCart = () =>{
    return(
        <Button variant="outline-success">Add to cart</Button>
    )
}

//check stock avilabilty
const stockAvailabilty = (quantity) =>{
    return (quantity > 0 ?

                <Badge  pill variant="primary">In Stock</Badge>: <Badge pill variant="warning">Out of stock</Badge>


    )

}


const productCard = ({product,viewProductBtn=true}) =>{
    return(


        <div className="card-deck" style={{margin:25}}>
            <div className="shadow p-1 mb-1 bg-white rounded">

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

                            {loadAddToCart()}

                        </div>
                    </div>

                 </div>
            </div>

        </div>




    )
}


export default productCard