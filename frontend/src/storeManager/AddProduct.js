import React, {useEffect, useState} from "react";
import Layout from "../core/Layout";
import {isValidated} from "../validators";
import {Col, Container, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {addProduct} from "./storeManagerApi";

function AddProduct() {


    const {user, token} = isValidated();

    const [values, setValues] = useState({
        productName: '',
        productDesc: '',
        productPrice: '',
        categories: [],
        productCat: '',
        shipping: '',
        productQuantity: '',
        productImage: '',
        error: '',
        loading: false,
        productAdded: '',
        formData: '',
        redirectToProfile: false

    })

    const {
        productName,
        productDesc,
        productPrice,
        categories,
        productCat,
        shipping,
        productQuantity,
        error,
        loading,
        productAdded,
        formData,
        redirectToProfile
    } = values;

    useEffect(() =>{
        setValues({...values, formData: new FormData()})
    },[])

    const handleChange = type => e =>{
        const data = type === 'productImage' ? e.target.files[0] : e.target.value
        formData.set(type,data)
        setValues({...values, [type]:data})
    }

    const submitProduct = (e) =>{

        e.preventDefault()
        setValues({...values, error: "", loading: true});

        addProduct(user._id, token , formData)
            .then(formD =>{
                if(formD.error){
                    setValues({...values, error: formD.error})
                }else{
                    setValues({
                        ...values,
                        productName: '',
                        productDesc: '',
                        productPrice: '',
                        productQuantity: '',
                        productImage: '',
                        loading: false,
                        productAdded: formD.name


                    })
                }
            })
    }

    const addImageForm = () => (
        <Form  className="mb-3" onSubmit={submitProduct}>
            <Form.Group controlId="formBasicProductName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control onChange={handleChange('productName')}  type="text" placeholder="Enter Product Name" value={productName} required/>
            </Form.Group>
            <Form.Group controlId="formBasicDescription">
                <Form.Label>Product Description</Form.Label>
                <Form.Control onChange={handleChange('productDesc')}  as="textarea" rows="3" placeholder="Enter Product Description" value={productDesc} required/>
            </Form.Group>
            <Form.Group controlId="formBasicPrice">
                <Form.Label>Product Price</Form.Label>
                <Form.Control onChange={handleChange('productPrice')} type="number" placeholder="Enter Product price" value={productPrice} required/>
            </Form.Group>
            <Form.Group  controlId="formBasicCategory">
                <Form.Label>Product Category</Form.Label>
                <Form.Control as="select" size="sm" custom  v
                    onChange={handleChange('productCat')}  required>
                    <option value="5e9f374bc5516922d03621f8">Female Jeans</option>
                    <option value="5e9f374bc5516922d03621f8">Wripped Female Jeans</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formBasicQuantity">
                <Form.Label>Product Quantity</Form.Label>
                <Form.Control onChange={handleChange('productQuantity')} type="number" placeholder="Select Product quantity" value={productQuantity} required/>
            </Form.Group>
            <Form.Group controlId="formBasicShipping">
                <Form.Label>Product Shipping</Form.Label>
                <Form.Control as="select" size="sm" custom
                              onChange={handleChange('shipping')}   required>
                <option value="0">No</option>
                <option value="1">Yes</option>
                </Form.Control>
            </Form.Group>
            <Form.File
                id="custom-file"
                name="productImage"
                accept="image/*"
                label="Upload Image"
                custom
                onChange={handleChange('productImage')}
            />
            <br/><br/>
            <Button variant="outline-success" type="submit">
                Add Product
            </Button>
        </Form>

    )

    return (
        <Layout title="Add a Product" description={`Hello ${user.firstName}, Let's add a new Product`}
                className="container col-md-6 offset-md-3">

            <Container>
                <Row>
                    <Col xs={12}>

                        {addImageForm()}
                        {/*{successMessage()}*/}
                        {/*{errorMessage()}*/}
                        {/*{categoryForm()}*/}
                        {/*{backButton()}*/}
                    </Col>
                </Row>
            </Container>
        </Layout>
    )


}

export default AddProduct