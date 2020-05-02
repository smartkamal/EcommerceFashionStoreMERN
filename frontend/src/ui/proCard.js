import React from 'react'
import {Link} from 'react-router-dom'

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import GetImage from './ImageComp'
import {API} from "../Config";

const productCard = ({product}) =>{
    return(


    // <Col xs={12} md={4} >
    //     <div className="card-deck" style={{margin:25}}>
    //     <Card  style={{ width: '25rem'}}>
    //
    //         <Card.Img variant="top"  style={{maxHeight:"100%", maxWidth:"100%"}} src={`${API}/product/image/${product._id}`} />
    //
    //         <Card.Body>
    //             <Card.Title>{product.productName}</Card.Title>
    //
    //             <Card.Text>
    //
    //                 {product.productDesc}
    //                 {product.productPrice}
    //             </Card.Text>
    //
    //             <div className="card-footer" style={{marginTop:'auto'}} >
    //                 <Button variant="success">View Product</Button>
    //
    //                 <Button variant="warning">Add to card</Button>
    //             </div>
    //
    //         </Card.Body>
    //
    //     </Card>
    //     </div>
    // </Col>


        <div className="card-deck" style={{margin:25}}>

            <div className="shadow p-2 mb-2 bg-white rounded">
            <div className="card border-secondary mb-3" style={{ width: '25rem'}}>

                <img className="card-img-top" style={{maxHeight:"50%", maxWidth:"100%"}} src={`${API}/product/image/${product._id}`} alt="Card image cap"/>
                    <div className="card-body">
                        <h5 className="card-title">{product.productName}</h5>
                        <p className="card-text">{product.productDesc}</p>
                        <p className="card-text">{product.productPrice}</p>
                        <div className="card-footer bg-transparent border-danger">
                            <Button variant="outline-primary" style={{ margin: 15}}>View Product</Button>
                            <Button variant="outline-success">Add to card</Button>
                        </div>
                    </div>

                 </div>
            </div>

        </div>




    )
}


export default productCard