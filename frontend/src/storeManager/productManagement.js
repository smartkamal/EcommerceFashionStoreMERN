import React, {useEffect, useState} from "react";
import Layout from "../ui/Layout";
import {isValidated} from "../validators";
import {Badge, Col, Container, ListGroup, Row} from "react-bootstrap";
import {getProducts, deleteProduct}from './storeManagerApi'
import {Link} from "react-router-dom";



const ProductManagement = () =>{

    //initilaize the state.
    const {user, token} = isValidated();
    const [allProducts ,propProducts ] = useState([]);


    //get all the products
    const getTheProducts = () =>{
        getProducts().then(res =>{
            if(res.error){
                console.log(res.error)
            }else{
                propProducts(res);
            }
        })
    }

    const removeProduct = productID =>{
        deleteProduct(productID,user._id,token).then(
            res =>{
                if(res.error){
                    console.log(res.error);
                }else{
                    getTheProducts();
                }
            }
        )
    }

    //load the method when componentmounts
    useEffect(() =>{
            getTheProducts()
    }, [])


    return (
        <Layout title="Product Manage" description="Manage your products" className="container-fluid">

        <Container>
            <Row>
                <Col>
                    <h2 className="text-center">Total Number of Products :{allProducts.length}</h2>
                    <hr/>
                    <ListGroup variant="flush">
                        {allProducts.map((product,index) =>(
                            <ListGroup.Item
                                key = {index}
                                className="d-flex justify-content-between"
                            >
                                <strong>{product.productName}</strong>
                                <Link to={`/storemanager/edit/product/${product._id}`}>
                                    <span>
                                         <Badge variant="warning">Update</Badge>
                                    </span>


                                </Link>
                                <Link >
                                    <span className="cursor-pointer" onClick={() => removeProduct(product._id)}><Badge variant="danger">Remove</Badge></span>
                                </Link>

                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                </Col>
            </Row>
        </Container>




        </Layout>

    );

}

export default ProductManagement;
